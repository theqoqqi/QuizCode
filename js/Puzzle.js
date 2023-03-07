import Question from "./Question.js";

class Puzzle {

    #title;

    #description;

    #codeTemplate;

    #questions;

    constructor(json) {
        this.#title = json.title;
        this.#description = json.description;
        this.#codeTemplate = json.codeTemplate;
        this.#questions = json.questions.map(questionJson => new Question(questionJson));
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get codeTemplate() {
        return this.#codeTemplate;
    }

    get questions() {
        return this.#questions;
    }
}

export default Puzzle;
