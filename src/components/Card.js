import './Card.css';


export default function Card({
    url,
    alt,
    selectable,
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
                <div className={selectable ? "card-front pointer" : "card-front"}>
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
