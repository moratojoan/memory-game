import Card from './Card';
import './Cards.css';

export default function Cards({cards, onSelectCard, selectable}) {

  return (
    <div className="container">
      {cards.map(({id, ...props}) => (
        <div key={id}>
          <Card
            selectable={selectable}
            onClick={() => onSelectCard(id)}
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
