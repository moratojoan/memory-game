import { useState, useEffect } from "react";


const possibleGameStates = {
    readyToStart: "ready-to-start",
    turnInProgress: "turn-in-progress",
    cardSelected: "card-selected",
    turnFinished: "turn-finished",
    win: "win",
    gameOver: "game-over"
};

export function useGame(cardsActions, scoreActions) {
    const [state, setState] = useState(possibleGameStates.readyToStart);

    function handleStartGame() {
        setState(possibleGameStates.turnInProgress);
    }

    function handleSelectCard(cardSelectedId) {
        cardsActions.handleSelectCard(cardSelectedId);
        setState(possibleGameStates.cardSelected);
    }

    function handleCardHasBeenSelected() {
        const numberOfSelectedCardsToFinishATurn = 2;
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

            const pointsOnFindEquivalentCards = 100;
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

        const waitingTimeToFinishTheGame = 1000;
        setTimeout(() => {
            setState(possibleGameStates.win);
        }, waitingTimeToFinishTheGame);
    }

    function handleNewGame() {
        cardsActions.prepareNewCards();
        scoreActions.resetScore();
        setState(possibleGameStates.readyToStart);
    }

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
        handleStartGame,
        handleNewGame,
        handleSelectCard
    }
}
