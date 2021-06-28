import { useEffect, useState } from "react";

import { getImages  } from "../services/getImages";


export function useImages() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getImages()
        .then(setImages)
    }, []);

    return images;
}
