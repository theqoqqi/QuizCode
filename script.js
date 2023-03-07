import puzzle1Json from './puzzles/puzzle1.js';
import Puzzle from './js/Puzzle.js';
import PuzzlePlayer from './js/PuzzlePlayer.js';

$(function () {
    let puzzle = new Puzzle(puzzle1Json);
    let puzzlePlayer = new PuzzlePlayer(puzzle);

    puzzlePlayer.showIntro();
});