import './Card.css';


export default function Card({url, alt}) {

    return (
        <div>
            <img
                src={url}
                alt={alt}
            />
        </div>
    )
}
