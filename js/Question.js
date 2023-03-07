import Choice from "./Choice.js";

class Question {

    #title;

    #defaultReplaceKey;

    #choices;

    constructor(json) {
        this.#title = json.title;
        this.#defaultReplaceKey = json.replaceKey ?? null;
        this.#choices = json.choices.map(choiceJson => new Choice(this, choiceJson));
    }

    get title() {
        return this.#title;
    }

    get defaultReplaceKey() {
        return this.#defaultReplaceKey;
    }

    get choices() {
        return this.#choices;
    }
}

export default Question;
