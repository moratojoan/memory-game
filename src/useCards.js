import { useEffect, useState } from "react";

import shuffleArray from './shuffleArray';
import generateUid from './generateUid';


export function useCards(images) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        prepareNewCards(images)
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

    function prepareNewCards(images) {
        const cards = getCards(images);
        setCards(cards);
    }

    return {
        cards,
        handleSelectCard,
        handleEquivalencyOfCardsSelected,
        allCardsHaveBeenDiscovered,
        prepareNewCards: () => prepareNewCards(images)
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

    const singleCards = selectedImageIndex.map(imageIndex => ({
        id: generateUid(),
        imageId: images[imageIndex].id,
        url: images[imageIndex].url,
        alt: images[imageIndex].alt,
        selected: false,
        discovered: false
    }));

    const duplicatedCards = singleCards.flatMap(card => (
        [
            card,
            {
                ...card,
                id: generateUid()
            }
        ]
    ));

    return shuffleArray(duplicatedCards);
}

