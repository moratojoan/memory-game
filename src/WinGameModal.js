import Modal from './Modal';


export default function WinGameModal({
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
                <h1>Congratulations!</h1>
                <p>You have won the game!</p>
                <p>Score: {score}</p>
                <p>Remaining time: {remainingSeconds} seconds</p>
                <button onClick={onClickNewGame}>
                    New Game
                </button>
            </div>
        </Modal>
    );
}
