import shuffleArray from '../utils/shuffleArray';
import generateUid from '../utils/generateUid';


export function getCards(images) {
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
