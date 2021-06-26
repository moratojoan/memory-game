import { useState, useEffect } from "react";


/* 
    game states:
        ready-to-start,
        turn-in-progress,
        checking-turn,
        win,
        game-over
*/
export function useGame(cards, actions) {
    const [state, setState] = useState("ready-to-start");

    function handleStartGame() {
        setState("turn-in-progress");
    }

    async function handleCheckTurn(handleEquivalencyOfCardsSelected, cardsSelected) {
        setState("checking-turn");
        await handleEquivalencyOfCardsSelected(cardsSelected);
        setState("turn-in-progress");
    }

    useEffect(() => {
        if(state === "turn-in-progress") {
          const cardsSelected = cards.filter(({selected}) => selected);
          if(cardsSelected.length === 2) {
            handleCheckTurn(
                actions.handleEquivalencyOfCardsSelected,
                cardsSelected
            );
          }
        }
    }, [state, cards, actions]);

    return {
        gameState: state,
        onStartGame: handleStartGame
    }
}
