import './Layout.css';


export default function Layout({
    title,
    boardGame,
    gameInfo,
    startGameButton
}) {

    return (
        <div className="layout-container">
            <header className="title-box">
                <h1>{title}</h1>
            </header>
            <main>
                <section className="game-container">
                    <div className="game-board-box">
                        {boardGame}
                    </div>

                    {startGameButton && (
                        <div>
                            {startGameButton}
                        </div>
                    )}
                    <div className="game-info-box">
                        {gameInfo}
                    </div>
                </section>
            </main>
        </div>
    )
}