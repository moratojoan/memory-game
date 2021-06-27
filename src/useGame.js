import { useState, useEffect } from "react";


const possibleGameStates = {
    readyToStart: "ready-to-start",
    turnInProgress: "turn-in-progress",
    checkTurnStarted: "check-turn-started",
    checkTurnEnded: "check-turn-ended",
    win: "win",
    gameOver: "game-over"
};

export function useGame(cards, actions, scoreActions) {
    const [state, setState] = useState(possibleGameStates.readyToStart);

    function handleStartGame() {
        setState(possibleGameStates.turnInProgress);
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
        actions.prepareNewCards();
        scoreActions.resetScore();
        setState(possibleGameStates.readyToStart);
    }

    useEffect(() => {
        if(state === possibleGameStates.turnInProgress) {
            const cardsSelected = cards.filter(({selected}) => selected);
            if(cardsSelected.length === 2) {
                handleCheckTurn(
                    cardsSelected,
                    actions.handleEquivalencyOfCardsSelected,
                    scoreActions.addPointsToScore
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
    }, [state, cards, actions, scoreActions]);

    return {
        possibleGameStates,
        gameState: state,
        handleStartGame,
        handleNewGame
    }
}
