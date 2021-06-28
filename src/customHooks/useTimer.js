import { useState } from "react";

import { getNow } from '../utils/dateTime';


export function useTimer() {
    const [remainingSeconds, setRemainingSeconds] = useState(60);
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
        setRemainingSeconds(60);
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
