import Cards from './Cards';
import Score from './Score';
import Timer from './Timer';
import Modal from './Modal';

import { useImages } from './useImages';
import { useCards } from './useCards';
import { useGame } from './useGame';
import { useScore } from './useScore';
import { useTimer } from './useTimer';


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
        remainingSeconds,
        actions: timerActions
    } = useTimer();
    const {
        actions: gameActions
    } = useGame(cardsActions, socreActions, timerActions);

    return (
        <div>
            <Cards
                cards={cards}
                onSelectCard={gameActions.handleSelectCard}
            />
            <Score score={score} />
            <Timer seconds={remainingSeconds} />
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
                    <p>Remaining time: {remainingSeconds} seconds</p>
                    <button onClick={gameActions.handleNewGame}>
                        New Game
                    </button>
                </div>
            </Modal>
        </div>
    );
}
