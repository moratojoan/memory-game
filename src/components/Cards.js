import Card from './Card';
import './Cards.css';

export default function Cards({cards, onSelectCard}) {

  return (
    <div className="container">
      {cards.map(({id, ...props}) => (
        <div key={id}>
          <Card
            onClick={() => onSelectCard(id)}
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
