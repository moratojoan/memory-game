import Cards from './Cards';
import Score from './Score';
import Modal from './Modal';

import { useImages } from './useImages';
import { useCards } from './useCards';
import { useGame } from './useGame';
import { useScore } from './useScore';




export default function App() {
    const images = useImages();
    const {
        cards,
        actions: cardsActions
    } = useCards(images);
    const {
        score,
        actions: socreActions
    } = useScore();
    const {
        possibleGameStates,
        gameState,
        actions
    } = useGame(cardsActions, socreActions);

    return (
        <div>
            <Cards
                cards={cards}
                onSelectCard={gameState === possibleGameStates.turnInProgress
                    ? actions.handleSelectCard
                    : () => {}
                }
            />
            <Score score={score} />
            {gameState === possibleGameStates.readyToStart && (
                <button onClick={actions.handleStartGame}>
                    Start Game
                </button>
            )}
            <Modal
                isOpen={gameState === possibleGameStates.win}
            >
                <div>
                    <h1>Congratulations!</h1>
                    <p>You have won the game!</p>
                    <p>Score: {score}</p>
                    <button onClick={actions.handleNewGame}>
                        New Game
                    </button>
                </div>
            </Modal>
        </div>
    );
}
