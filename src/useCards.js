import { useEffect, useState } from "react";

import shuffleArray from './shuffleArray';


export function useCards(images) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const cards = getCards(images);
        setCards(cards);
    }, [images]);

    return cards;
}

function getCards(images) {
    const numberOfImagesToSelect = images.length > 6 ? 6 : images.length;

    let selectedImageIndex = [];
    while(selectedImageIndex.length < numberOfImagesToSelect) {
        const randomImageIndex = Math.floor(Math.random() * images.length);
        if(!selectedImageIndex.includes(randomImageIndex)) {
            selectedImageIndex.push(randomImageIndex);
        }
    }

    const singleCards = selectedImageIndex.map((imageIndex, index) => ({
        id: index,
        imageId: images[imageIndex].id,
        url: images[imageIndex].url,
        alt: images[imageIndex].alt
    }));

    const duplicatedCards = singleCards.flatMap((card) => (
        [
            card,
            {
                ...card,
                id: card.id + numberOfImagesToSelect
            }
        ]
    ));

    return shuffleArray(duplicatedCards);
}

