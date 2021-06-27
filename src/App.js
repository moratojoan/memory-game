import Layout from './Layout';

import Cards from './Cards';
import Score from './Score';
import Timer from './Timer';
import WinGameModal from './WinGameModal';
import GameOverModal from './GameOverModal';

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
        actions: scoreActions
    } = useScore();
    const {
        remainingSeconds,
        actions: timerActions
    } = useTimer();
    const {
        actions: gameActions
    } = useGame({
        remainingSeconds
    }, {
        cardsActions,
        scoreActions,
        timerActions
    });

    return (
        <>
            <Layout
                title="Github Memory"
                boardGame={
                    <Cards
                        cards={cards}
                        onSelectCard={gameActions.handleSelectCard}
                    />
                }
                gameInfo={
                    <>
                        <Score score={score} />
                        <Timer seconds={remainingSeconds} />
                    </>
                }
                startGameButton={
                    <>
                        {gameActions.gameIsReadyToStart() && (
                            <button onClick={gameActions.handleStartGame}>
                                Start Game
                            </button>
                        )}
                    </>
                }
            />
            <WinGameModal
                isOpen={gameActions.playerHasWonTheGame()}
                score={score}
                remainingSeconds={remainingSeconds}
                onClickNewGame={gameActions.handleNewGame}
            />
            <GameOverModal
                isOpen={gameActions.playerHasLostTheGame()}
                score={score}
                remainingSeconds={remainingSeconds}
                onClickNewGame={gameActions.handleNewGame}
            />
        </>
    );
}
