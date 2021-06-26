import Cards from './Cards';
import Modal from './Modal';

import { useImages } from './useImages';
import { useCards } from './useCards';
import { useGame } from './useGame';




export default function App() {
    const images = useImages();
    const {
        cards,
        handleSelectCard,
        handleEquivalencyOfCardsSelected,
        allCardsHaveBeenDiscovered,
        prepareNewCards
    } = useCards(images);
    const {
        possibleGameStates,
        gameState,
        handleStartGame,
        handleNewGame
    } = useGame(cards, {
        handleEquivalencyOfCardsSelected,
        allCardsHaveBeenDiscovered,
        prepareNewCards
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
            <Modal
                isOpen={gameState === possibleGameStates.win}
            >
                <div>
                    <h1>Congratulations!</h1>
                    <p>You have won the game!</p>
                    <button onClick={handleNewGame}>
                        New Game
                    </button>
                </div>
            </Modal>
        </div>
    );
}
