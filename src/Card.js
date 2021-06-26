import './Card.css';


export default function Card({url, alt}) {

    return (
        <div className="card">
            <div className="card-inner">
                <div className="card-front">
                    ?
                </div>
                <div className="card-back">
                    <img
                        src={url}
                        alt={alt}
                    />
                </div>
            </div>
        </div>
    )
}
