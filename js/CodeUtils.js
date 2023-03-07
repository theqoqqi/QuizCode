
class CodeUtils {

    static applyReplacements(code, replacements) {
        while (this.hasSomethingToReplace(code, replacements)) {
            for (const [replaceKey, replacement] of Object.entries(replacements)) {
                code = this.applyReplacement(code, replaceKey, replacement);
            }
        }

        return code;
    }

    static hasSomethingToReplace(code, replacements) {
        for (const replaceKey of Object.keys(replacements)) {
            if (this.getReplaceKeyRegExp(replaceKey).test(code)) {
                return true;
            }
        }

        return false;
    }

    static applyReplacement(code, replaceKey, replacement) {
        let trimmedReplacement = this.trim(replacement);
        let lines = code.split('\n');

        let replacedLines = lines.flatMap(line => {
            let replacedLine = this.applyReplacementForLine(line, replaceKey, trimmedReplacement);

            return replacedLine.split('\n');
        });

        return replacedLines.join('\n');
    }

    static applyReplacementForLine(line, replaceKey, replacement) {
        if (line.trim() === '') {
            return line;
        }

        let spaceLevels = this.getSpaceLevels(line);
        let tabulatedReplacement = this.applyTabulation(replacement, spaceLevels);
        let regExp = this.getReplaceKeyRegExp(replaceKey);

        return line.replaceAll(regExp, tabulatedReplacement.trimLeft());
    }

    static applyTabulation(code, spaceLevels) {
        let lines = code.split('\n');
        let tabulatedLines = lines.map(line => {
            return ' '.repeat(spaceLevels) + line;
        });

        return tabulatedLines.join('\n');
    }

    static trim(code) {
        return this.trimTabulation(this.trimEmptyLines(code));
    }

    static trimTabulation(code) {
        let lines = code.split('\n');
        let spaceLevels = lines
            .filter(line => line.trim() !== '')
            .map(line => this.getSpaceLevels(line));

        let spacesToTrim = Math.min(...spaceLevels);
        let trimmedLines = lines.map(line => this.trimLine(line, spacesToTrim));

        return trimmedLines.join('\n');
    }

    static trimEmptyLines(code) {
        let lines = code.split('\n');

        while (lines.length > 0 && lines[0].trim() === '') {
            lines.shift();
        }

        while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
            lines.pop();
        }

        return lines.join('\n');
    }

    static getSpaceLevels(line) {
        let levels = 0;

        while (line[levels] === ' ') {
            levels++;
        }

        if (levels >= line.length) {
            return Infinity;
        }

        return levels;
    }

    static trimLine(line, spaceLevels) {
        return line.substring(spaceLevels);
    }

    static applyAllReplacements(code, replacements = {}, defaultReplacement = '') {
        return code.replaceAll(/@(\w+)/g, function (replaceablePart, replaceKey) {
            return replacements[replaceKey] ?? defaultReplacement ?? replaceablePart;
        });
    }

    static getReplaceKeyRegExp(replaceKey) {
        return new RegExp(`@${replaceKey}\\b`, 'g');
    }
}

export default CodeUtils;
