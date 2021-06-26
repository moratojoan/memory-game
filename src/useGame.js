import { useState, useEffect } from "react";


const possibleGameStates = {
    readyToStart: "ready-to-start",
    turnInProgress: "turn-in-progress",
    checkTurnStarted: "check-turn-started",
    checkTurnEnded: "check-turn-ended",
    win: "win",
    gameOver: "game-over"
};

export function useGame(cards, actions) {
    const [state, setState] = useState(possibleGameStates.readyToStart);

    function handleStartGame() {
        setState(possibleGameStates.turnInProgress);
    }

    async function handleCheckTurn(handleEquivalencyOfCardsSelected, cardsSelected) {
        setState(possibleGameStates.checkTurnStarted);
        await handleEquivalencyOfCardsSelected(cardsSelected);
        setState(possibleGameStates.checkTurnEnded);
    }

    function handleNewGame() {
        actions.prepareNewCards();
        setState(possibleGameStates.readyToStart);
    }

    useEffect(() => {
        if(state === possibleGameStates.turnInProgress) {
            const cardsSelected = cards.filter(({selected}) => selected);
            if(cardsSelected.length === 2) {
                handleCheckTurn(
                    actions.handleEquivalencyOfCardsSelected,
                    cardsSelected
                );
            }
        } else if(state === possibleGameStates.checkTurnEnded) {
            if(actions.allCardsHaveBeenDiscovered()) {
                const waitingTimeToFinishTheGame = 1000;
                setTimeout(() => {
                    setState(possibleGameStates.win);
                }, waitingTimeToFinishTheGame);
            } else {
                setState(possibleGameStates.turnInProgress);
            }
        }
    }, [state, cards, actions]);

    return {
        possibleGameStates,
        gameState: state,
        handleStartGame,
        handleNewGame
    }
}
