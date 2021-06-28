import { useEffect, useState } from "react";

import { getCards } from "../services/getCards";


export function useCards(images) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        prepareNewCards(images)
    }, [images]);

    function handleSelectCard(id) {
        const cardsUpdated = cards.map(card => {
            if(card.id !== id) return card;
            if(card.selected || card.discovered) return card;

            return {
                ...card,
                selected: true
            }
        });
        setCards(cardsUpdated);
    }

    function cardsAreEquivalent(cardsSelected) {
        if(cardsSelected.length < 2) {
            return false;
        }

        const imageIdToCheck = cardsSelected[0].imageId;
        const sameImages = cardsSelected.every(({imageId}) => imageId === imageIdToCheck);
        return sameImages;
    }
    
    function markSelectedCardsAsDiscovered(cardsSelected) {
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

    function unselectAllCards() {
        const cardsUpdated = cards.map(card => ({
            ...card,
            selected: false
        }));
        setCards(cardsUpdated);
    }

    function getSelectedCards() {
        return cards.filter(({selected}) => selected);
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
        actions: {
            handleSelectCard,
            allCardsHaveBeenDiscovered,
            prepareNewCards: () => prepareNewCards(images),
            getSelectedCards,
            cardsAreEquivalent,
            markSelectedCardsAsDiscovered,
            unselectAllCards
        }
    };
}

