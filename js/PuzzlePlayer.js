import PuzzleView from "./PuzzleView.js";
import CodeUtils from "./CodeUtils.js";

class PuzzlePlayer {

    #view;

    #puzzle;

    #questions = [];

    #question = null;

    #questionIndex = 0;

    #hoveredChoice = null;

    #score = 0;

    #codeContent = '';

    #allReplacements = {};

    constructor(puzzle) {
        this.#puzzle = puzzle;
        this.#view = new PuzzleView();

        this.setup();

        this.#view.onStart(() => {
            this.start();
        });

        this.#view.onMouseEnterChoice(choice => {
            this.onMouseEnterChoice(choice);
        });

        this.#view.onMouseLeaveChoice(() => {
            this.onMouseLeaveChoice();
        });

        this.#view.onSelectChoice(choice => {
            this.onSelectChoice(choice);
        });
    }

    onMouseEnterChoice(choice) {
        this.#hoveredChoice = choice;
        this.updateCodeContent();
    }

    onMouseLeaveChoice() {
        this.#hoveredChoice = null;
        this.updateCodeContent();
    }

    onSelectChoice(choice) {
        this.applyReplacements(choice);
        this.enqueueNestedQuestions(choice);
        this.#score += choice.score ?? 0;
        this.updateCodeContent();
        this.continue();
    }

    showIntro() {
        this.#view.setPuzzle(this.#puzzle);
        this.#view.showIntro(this.#puzzle);
        this.updateCodeContent();
    }

    setup() {
        this.#questions = this.#puzzle.questions.slice();
        this.#questionIndex = 0;
        this.#score = 0;
        this.#codeContent = this.#puzzle.codeTemplate;
    }

    start() {
        this.showNextQuestion();
    }

    continue() {
        if (this.hasNextQuestion()) {
            this.showNextQuestion();
        } else {
            this.showResults();
        }
    }

    applyReplacements(choice) {
        this.#allReplacements = Object.assign(this.#allReplacements, choice.replacements);
        this.#codeContent = CodeUtils.applyReplacements(this.#codeContent, this.#allReplacements);
    }

    enqueueNestedQuestions(choice) {
        let nestedQuestions = choice.nestedQuestions ?? [];

        this.#questions.splice(this.#questionIndex + 1, 0, ...nestedQuestions);
    }

    hasNextQuestion() {
        return this.#questionIndex < this.#questions.length;
    }

    showNextQuestion() {
        this.#question = this.#questions[this.#questionIndex++];

        this.#view.showQuestion(this.#question, this.#allReplacements);
        this.updateCodeContent();
    }

    showResults() {
        this.#view.showResults({
            score: this.#score,
        });
    }

    updateCodeContent() {
        let highlights = this.getCurrentHighlights();
        let defaultReplacement = PuzzleView.createReplacementCodeHtml('???');
        let codeContent = CodeUtils.applyAllReplacements(this.#codeContent, highlights, defaultReplacement);

        this.#view.setCodeContent(codeContent);
    }

    getCurrentHighlights() {
        let highlights = {};
        let addReplaceKey = replaceKey => {
            highlights[replaceKey] = PuzzleView.createHighlightedReplacementCodeHtml('???');
        };

        if (this.#question?.defaultReplaceKey) {
            addReplaceKey(this.#question.defaultReplaceKey);
        }

        if (this.#hoveredChoice) {
            for (const replaceKey of Object.keys(this.#hoveredChoice.replacements)) {
                addReplaceKey(replaceKey);
            }
        }

        return highlights;
    }
}

export default PuzzlePlayer;
