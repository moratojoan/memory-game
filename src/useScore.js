import { useState } from "react";


export function useScore() {
    const [score, setScore] = useState(0);

    function addPointsToScore(points) {
        const newScore = score + points;
        setScore(newScore)
    }

    function resetScore() {
        setScore(0);
    }

    return {
        score,
        addPointsToScore,
        resetScore
    }
}
