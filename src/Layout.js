

export default function Layout({
    title,
    boardGame,
    gameInfo,
    startGameButton
}) {

    return (
        <main>
            <header>
                <h1>{title}</h1>
            </header>
            <section>
                <div>
                    {boardGame}
                </div>
                <div>
                    {gameInfo}
                </div>
                {startGameButton && (
                    <div>
                        {startGameButton}
                    </div>
                )}
            </section>
        </main>
    )
}