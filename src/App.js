import Cards from './Cards';

import { useImages } from './useImages';
import { useCards } from './useCards';


export default function App() {
  const images = useImages();
  const {
    cards,
    onSelectCard
  } = useCards(images);

  return (
    <div>
      <Cards
        cards={cards}
        onSelectCard={onSelectCard}
      />
    </div>
  );
}
