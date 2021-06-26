import Card from './Card';
import './Cards.css';

export default function Cards({cards}) {

  return (
    <div className="container">
      {cards.map(({id, ...props}) => (
        <div key={id}>
          <Card
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
