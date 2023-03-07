import CodeUtils from "./CodeUtils.js";

class PuzzleView {

    $container;

    $code;



    $introCard;

    $introTitle;

    $introDescription;

    $startButton;



    $questionCard;

    $puzzleTitle;

    $questionTitle;

    $choiceList;



    $resultsCard;

    $score;



    #onStartCallback = () => {};

    #onMouseEnterChoiceCallback = () => {};

    #onMouseLeaveChoiceCallback = () => {};

    #onSelectChoiceCallback = () => {};



    constructor() {
        this.$container = $('#puzzle-container');
        this.$code = $('#code');

        this.$introCard = $('#intro-card');
        this.$introTitle = $('#intro-title');
        this.$introDescription = $('#intro-description');

        this.$startButton = $('#start-button');
        this.$questionCard = $('#question-card');
        this.$puzzleTitle = $('#puzzle-title');
        this.$questionTitle = $('#question-title');
        this.$choiceList = $('#choice-list');

        this.$resultsCard = $('#results-card');
        this.$score = $('#score');

        this.bindListeners();
    }

    bindListeners() {
        this.$startButton.click(e => {
            this.#onStartCallback();
        });

        this.$container.on('mouseenter', '.question-choice', e => {
            let $choice = $(e.currentTarget);
            let choice = $choice.data('choice');

            this.#onMouseEnterChoiceCallback(choice);
        });

        this.$container.on('mouseleave', '.question-choice', e => {
            let $choice = $(e.currentTarget);
            let choice = $choice.data('choice');

            this.#onMouseLeaveChoiceCallback(choice);
        });

        this.$container.on('click', '.question-choice', e => {
            let $choice = $(e.currentTarget);
            let choice = $choice.data('choice');

            this.#onSelectChoiceCallback(choice);
        });
    }

    onStart(callback) {
        this.#onStartCallback = callback;
    }

    onMouseEnterChoice(callback) {
        this.#onMouseEnterChoiceCallback = callback;
    }

    onMouseLeaveChoice(callback) {
        this.#onMouseLeaveChoiceCallback = callback;
    }

    onSelectChoice(callback) {
        this.#onSelectChoiceCallback = callback;
    }

    setPuzzle(puzzle) {
        this.$puzzleTitle.text(puzzle.title);
    }

    setCodeContent(codeContent) {
        this.$code.html(CodeUtils.trim(codeContent));
    }

    showIntro(puzzle) {
        this.setVisibleCard(this.$introCard);

        this.$introTitle.text(puzzle.title);
        this.$introDescription.text(puzzle.description);
    }

    showQuestion(question, choiceReplacements) {
        this.setVisibleCard(this.$questionCard);

        this.$questionTitle.text(question.title);

        this.$choiceList.empty();

        for (const choice of this.shuffleQuestions(question.choices)) {
            let $choice = this.createChoice(choice, choiceReplacements);

            this.$choiceList.append($choice);
        }
    }

    shuffleQuestions(choices) {
        let currentIndex = choices.length,  randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [choices[currentIndex], choices[randomIndex]] = [choices[randomIndex], choices[currentIndex]];
        }

        return choices;
    }

    showResults(results) {
        this.setVisibleCard(this.$resultsCard);

        this.$score.text(results.score);
    }

    setVisibleCard($card) {
        this.$introCard.hide();
        this.$questionCard.hide();
        this.$resultsCard.hide();

        $card.show();
    }

    createChoice(choice, choiceReplacements) {
        let text = choice.title;

        if (!choice.hasTextTitle) {
            let codeContent = CodeUtils.trim(choice.title);
            codeContent = CodeUtils.applyAllReplacements(codeContent, choiceReplacements, null);

            text = '<pre>' + codeContent + '</pre>';
        }

        let $choice = $(`
            <button class='list-group-item list-group-item-action question-choice'>
                ${text}
            </button>
        `);

        $choice.data('choice', choice);

        return $choice;
    }

    static createReplacementCodeHtml(code) {
        return `<span class='replacement'>${code}</span>`;
    }

    static createHighlightedReplacementCodeHtml(code) {
        return `<span class='replacement highlighted'>${code}</span>`;
    }
}

export default PuzzleView;
