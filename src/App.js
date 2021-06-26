import Modal from 'react-modal';

import Cards from './Cards';

import { useImages } from './useImages';
import { useCards } from './useCards';
import { useGame } from './useGame';

Modal.setAppElement('#root');

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
                Win
                <button onClick={handleNewGame}>
                    New Game
                </button>
            </Modal>
        </div>
    );
}
