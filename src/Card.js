import './Card.css';


export default function Card({
    url,
    alt,
    selected,
    onClick
}) {

    return (
        <div
            className={selected ? "card selected" : "card"}
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
