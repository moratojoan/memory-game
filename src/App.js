import Cards from './Cards';

import { useImages } from './useImages';
import { useCards } from './useCards';
import { useGame } from './useGame';


export default function App() {
    const images = useImages();
    const {
        cards,
        handleSelectCard,
        handleEquivalencyOfCardsSelected,
        allCardsHaveBeenDiscovered
    } = useCards(images);
    const {
        possibleGameStates,
        gameState,
        handleStartGame
    } = useGame(cards, {
        handleEquivalencyOfCardsSelected,
        allCardsHaveBeenDiscovered
    });

    return (
        <div>
            <Cards
                cards={cards}
                onSelectCard={gameState === possibleGameStates.turnInProgress
                    ? handleSelectCard
                    : () => {}
                }
            />
            {gameState === possibleGameStates.readyToStart && (
                <button onClick={handleStartGame}>
                    Start Game
                </button>
            )}
        </div>
    );
}
