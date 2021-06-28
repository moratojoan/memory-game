import './Card.css';


export default function Card({
    url,
    alt,
    selected,
    discovered,
    onClick
}) {

    return (
        <div
            className={(selected || discovered) ? "card selected" : "card"}
            onClick={onClick}
        >
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
