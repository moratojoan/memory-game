import Cards from './Cards';

import { useImages } from './useImages';
import { useCards } from './useCards';


export default function App() {
  const images = useImages();
  const cards = useCards(images);

  return (
    <div>
      <Cards cards={cards} />
    </div>
  );
}
