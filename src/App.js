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
        actions: gameActions
    } = useGame(cardsActions, socreActions);

    return (
        <div>
            <Cards
                cards={cards}
                onSelectCard={gameActions.handleSelectCard}
            />
            <Score score={score} />
            {gameActions.gameIsReadyToStart() && (
                <button onClick={gameActions.handleStartGame}>
                    Start Game
                </button>
            )}
            <Modal
                isOpen={gameActions.playerHasWonTheGame()}
            >
                <div>
                    <h1>Congratulations!</h1>
                    <p>You have won the game!</p>
                    <p>Score: {score}</p>
                    <button onClick={gameActions.handleNewGame}>
                        New Game
                    </button>
                </div>
            </Modal>
        </div>
    );
}
