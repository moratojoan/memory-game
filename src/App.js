import Cards from './Cards';

import { useImages } from './useImages';
import { useCards } from './useCards';
import { useGame } from './useGame';


export default function App() {
    const images = useImages();
    const {
        cards,
        handleSelectCard,
        handleEquivalencyOfCardsSelected
    } = useCards(images);
    const {
        gameState,
        onStartGame
    } = useGame(cards, {
        handleEquivalencyOfCardsSelected
    });

    return (
        <div>
            <Cards
                cards={cards}
                onSelectCard={gameState === "turn-in-progress" ? handleSelectCard : () => {}}
            />
            {gameState === "ready-to-start" && (
                <button onClick={onStartGame}>
                    Start Game
                </button>
            )}
        </div>
    );
}
