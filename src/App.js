import Layout from './components/Layout';
import Cards from './components/Cards';
import Score from './components/Score';
import Timer from './components/Timer';
import WinGameModal from './components/WinGameModal';
import GameOverModal from './components/GameOverModal';

import { useImages } from './customHooks/useImages';
import { useCards } from './customHooks/useCards';
import { useGame } from './customHooks/useGame';
import { useScore } from './customHooks/useScore';
import { useTimer } from './customHooks/useTimer';


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
        cards: {
            actions: cardsActions
        },
        score: {
            actions: scoreActions
        },
        timer: {
            remainingSeconds,
            actions: timerActions
        }
    });

    return (
        <>
            <Layout
                title="Github Memory"
                boardGame={
                    <Cards
                        cards={cards}
                        selectable={gameActions.turnIsInProgress()}
                        onSelectCard={gameActions.handleSelectCard}
                    />
                }
                gameInfo={
                    <>
                        <Timer seconds={remainingSeconds} />
                        <Score score={score} />
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
