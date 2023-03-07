import Question from "./Question.js";

class Choice {

    #question;

    #title;

    #hasTextTitle;

    #replacements;

    #score;

    #nestedQuestions;

    constructor(question, json) {
        this.#question = question;
        this.#replacements = this.#getReplacements(json);
        this.#title = this.#getTitle(json);
        this.#hasTextTitle = !!json.title;
        this.#score = json.score;
        this.#nestedQuestions = this.getNestedQuestions(json);
    }

    getNestedQuestions(json) {
        if (!json.nestedQuestions) {
            return [];
        }

        return json.nestedQuestions.map(questionJson => new Question(questionJson));
    }

    get hasTextTitle() {
        return this.#hasTextTitle;
    }

    get title() {
        return this.#title;
    }

    get replacements() {
        return this.#replacements;
    }

    get score() {
        return this.#score;
    }

    get nestedQuestions() {
        return this.#nestedQuestions;
    }

    #getReplacements(json) {
        return json.replacements ?? {
            [this.#question.defaultReplaceKey]: json.replacement,
        };
    }

    #getTitle(json) {
        return json.title ?? this.#getDefaultTitle();
    }

    #getDefaultTitle() {
        return Object.values(this.#replacements)[0];
    }
}

export default Choice;
