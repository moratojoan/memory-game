import Modal from './Modal';


export default function GameOverModal({
    isOpen,
    score,
    remainingSeconds,
    onClickNewGame
}) {
    return (
        <Modal
            isOpen={isOpen}
        >
            <div>
                <h1>Game Over</h1>
                <p>You have lost the game...</p>
                <p>Score: {score}</p>
                <p>Remaining time: {remainingSeconds} seconds</p>
                <button onClick={onClickNewGame}>
                    Try again
                </button>
            </div>
        </Modal>
    );
}
