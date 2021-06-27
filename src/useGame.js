import { useState, useEffect } from "react";


const possibleGameStates = {
    readyToStart: "ready-to-start",
    turnInProgress: "turn-in-progress",
    cardSelected: "card-selected",
    checkTurnStarted: "check-turn-started",
    checkTurnEnded: "check-turn-ended",
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

    async function handleCheckTurn(cardsSelected, checkCards, addPoints) {
        setState(possibleGameStates.checkTurnStarted);
        const equivalentCardsFinded = await checkCards(cardsSelected);
        if(equivalentCardsFinded) {
            const pointsOnFindEquivalentCards = 100;
            addPoints(pointsOnFindEquivalentCards);
        }
        setState(possibleGameStates.checkTurnEnded);
    }

    function handleNewGame() {
        cardsActions.prepareNewCards();
        scoreActions.resetScore();
        setState(possibleGameStates.readyToStart);
    }

    useEffect(() => {
        if(state === possibleGameStates.cardSelected) {
            const cardsSelected = cardsActions.getSelectedCards();
            const numberOfSelectedCardsToFinishATurn = 2;
            if(cardsSelected.length === numberOfSelectedCardsToFinishATurn) {
                handleCheckTurn(
                    cardsSelected,
                    cardsActions.handleEquivalencyOfCardsSelected,
                    scoreActions.addPointsToScore
                );
            } else {
                setState(possibleGameStates.turnInProgress);
            }
        } else if(state === possibleGameStates.checkTurnEnded) {
            if(cardsActions.allCardsHaveBeenDiscovered()) {
                const waitingTimeToFinishTheGame = 1000;
                setTimeout(() => {
                    setState(possibleGameStates.win);
                }, waitingTimeToFinishTheGame);
            } else {
                setState(possibleGameStates.turnInProgress);
            }
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
