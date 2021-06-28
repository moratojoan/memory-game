import { useState } from "react";

import { getNow } from '../utils/dateTime';


const timeAvailableToFinishTheGame = 60;

export function useTimer() {
    const [remainingSeconds, setRemainingSeconds] = useState(timeAvailableToFinishTheGame);
    const [setIntervalId, setSetIntervalId] = useState(null);

    function startTimer() {
        const startTime = getNow();
        const startReminingSeconds = remainingSeconds;
        const updateInterval = 100;
        function updateRemainingSeconds() {
            const millisecondsDiff = getNow() - startTime;
            const secondsDiff = Math.floor(millisecondsDiff / 1000);
            const remainingSecondsUpdated = startReminingSeconds - secondsDiff;
            setRemainingSeconds(remainingSecondsUpdated);
        }

        const newSetIntervalId = setInterval(updateRemainingSeconds, updateInterval);
        setSetIntervalId(newSetIntervalId);
    }

    function stopTimer() {
        if(setIntervalId) {
            clearInterval(setIntervalId);
            setSetIntervalId(null);
        }
    }

    function resetTimer() {
        setRemainingSeconds(timeAvailableToFinishTheGame);
    }

    return {
        remainingSeconds,
        actions: {
            startTimer,
            resetTimer,
            stopTimer
        }
    }
}
