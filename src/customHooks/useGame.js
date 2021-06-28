import { useState, useEffect } from "react";


const possibleGameStates = {
    readyToStart: "ready-to-start",
    turnInProgress: "turn-in-progress",
    cardSelected: "card-selected",
    turnFinished: "turn-finished",
    win: "win",
    gameOver: "game-over"
};

const numberOfSelectedCardsToFinishATurn = 2;
const pointsOnFindEquivalentCards = 100;

export function useGame({ remainingSeconds }, {cardsActions, scoreActions, timerActions}) {
    const [state, setState] = useState(possibleGameStates.readyToStart);


    function gameIsReadyToStart() {
        return state === possibleGameStates.readyToStart;
    }

    function turnIsInProgress() {
        return state === possibleGameStates.turnInProgress;
    }

    function handleStartGame() {
        setState(possibleGameStates.turnInProgress);
        timerActions.startTimer();
    }

    function handleFinishTimer() {
        timerActions.stopTimer();
        if(state === possibleGameStates.win) {
            return;
        }

        handleGameOver();
    }

    function handleGameOver() {
        const waitingTimeToFinishTheGame = 1000;
        setTimeout(() => {
            setState(possibleGameStates.gameOver);
        }, waitingTimeToFinishTheGame);
    }

    function handleSelectCard(cardSelectedId) {
        if(state !== possibleGameStates.turnInProgress) {
            return;
        }

        cardsActions.handleSelectCard(cardSelectedId);
        setState(possibleGameStates.cardSelected);
    }

    function handleCardHasBeenSelected() {
        const cardsSelected = cardsActions.getSelectedCards();

        const movesInATurnCompleted = cardsSelected.length === numberOfSelectedCardsToFinishATurn;
        if(!movesInATurnCompleted) {
            setState(possibleGameStates.turnInProgress);
            return;
        }

        handleMovesInATurnCompleted(cardsSelected);
    }

    async function handleMovesInATurnCompleted(cardsSelected) {
        const equivalentCards = cardsActions.cardsAreEquivalent(cardsSelected);
        if(equivalentCards) {
            cardsActions.markSelectedCardsAsDiscovered(cardsSelected);

            scoreActions.addPointsToScore(pointsOnFindEquivalentCards);
            setState(possibleGameStates.turnFinished);
        } else {
            const waitingTimeToUnselect = 1000;
            setTimeout(() => {
                cardsActions.unselectAllCards();
                setState(possibleGameStates.turnFinished);
            }, waitingTimeToUnselect);
        }
    }

    function handleFinishedTurn() {
        const allCardsHaveBeenDiscovered = cardsActions.allCardsHaveBeenDiscovered();
        if(!allCardsHaveBeenDiscovered) {
            setState(possibleGameStates.turnInProgress);
            return;
        }

        handleWinTheGame();
    }

    function handleWinTheGame() {
        timerActions.stopTimer();

        const waitingTimeToFinishTheGame = 1000;
        setTimeout(() => {
            setState(possibleGameStates.win);
        }, waitingTimeToFinishTheGame);
    }

    function playerHasWonTheGame() {
        return state === possibleGameStates.win;
    }

    function playerHasLostTheGame() {
        return state === possibleGameStates.gameOver;
    }

    function handleNewGame() {
        cardsActions.prepareNewCards();
        scoreActions.resetScore();
        timerActions.resetTimer();
        setState(possibleGameStates.readyToStart);
    }

    useEffect(() => {
        if(remainingSeconds === 0) {
            handleFinishTimer();
        }
    }, [remainingSeconds]);

    useEffect(() => {
        if(state === possibleGameStates.cardSelected) {
            handleCardHasBeenSelected();
        } else if(state === possibleGameStates.turnFinished) {
            handleFinishedTurn();
        }
    }, [state]);

    return {
        possibleGameStates,
        gameState: state,
        actions: {
            gameIsReadyToStart,
            turnIsInProgress,
            handleStartGame,
            handleNewGame,
            handleSelectCard,
            playerHasWonTheGame,
            playerHasLostTheGame
        }
    }
}
