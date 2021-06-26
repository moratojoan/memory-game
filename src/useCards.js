import { useEffect, useState } from "react";

import shuffleArray from './shuffleArray';


export function useCards(images) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const cards = getCards(images);
        setCards(cards);
    }, [images]);

    function handleSelectCard(id) {
        const cardsUpdated = cards.map(card => {
            if(card.id !== id) return card;
            if(card.selected) return card;

            return {
                ...card,
                selected: true
            }
        });
        setCards(cardsUpdated);
    }

    function handleEquivalencyOfCardsSelected(cardsSelected) {
        if(cardsSelected.length < 2) {
            return;
        }

        return new Promise(resolve => {
            function unselectAllCards() {
                const cardsUpdated = cards.map(card => ({
                    ...card,
                    selected: false
                }));
                setCards(cardsUpdated);
            }
            function markSelectedCardsAsDiscovered() {
                const idsOfSelectedCards = cardsSelected.map(({id}) => id);
                const cardsUpdated = cards.map(card => {
                    if(!idsOfSelectedCards.includes(card.id)) {
                        return card;
                    }
                    return {
                        ...card,
                        selected: false,
                        discovered: true
                    }
                });
                setCards(cardsUpdated);
            }

            const imageIdToCheck = cardsSelected[0].imageId;
            const sameImages = cardsSelected.every(({imageId}) => imageId === imageIdToCheck);
            if(!sameImages) {
                const waitingTimeToUnselect = 1000;
                setTimeout(() => {
                    unselectAllCards();
                    resolve(sameImages);
                }, waitingTimeToUnselect);
                return;
            }

            markSelectedCardsAsDiscovered();
            resolve(sameImages);
        });
    }

    function allCardsHaveBeenDiscovered() {
        return cards.every(({discovered}) => discovered);
    }

    return {
        cards,
        handleSelectCard,
        handleEquivalencyOfCardsSelected,
        allCardsHaveBeenDiscovered
    };
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
        alt: images[imageIndex].alt,
        selected: false,
        discovered: false
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

