import { useState } from "react";


const initialScore = 0;

export function useScore() {
    const [score, setScore] = useState(initialScore);

    function addPointsToScore(points) {
        const newScore = score + points;
        setScore(newScore)
    }

    function resetScore() {
        setScore(initialScore);
    }

    return {
        score,
        actions: {
            addPointsToScore,
            resetScore
        }
    }
}
