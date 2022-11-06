import {useEffect, useState} from "react";

const StreamCounter = ({startValue, endValue}) => {
    const startValueNumber = parseInt(startValue);
    const endValueNumber = parseInt(endValue);
    const [counter, setCounter] = useState(startValueNumber);

    const isIncreasing = startValueNumber < endValueNumber;

    const millisecondsInDay = 86400000;
    const millisecondsIn30Days = millisecondsInDay * 30;

    const newValue = isIncreasing ? (endValueNumber / millisecondsIn30Days) : (startValueNumber / millisecondsIn30Days);

    useEffect(() => {
        const interval = setInterval(() =>
        {
            if (isIncreasing) {
                if (counter < endValueNumber) {
                    setCounter((counter) => counter + newValue);
                }
            } else {
                if (counter > endValueNumber) {
                    setCounter((counter) => counter - newValue);
                }
            }
        }, 1);
        return () => {
            clearInterval(interval);
        };
    }, [counter]);

    return <>{counter}</>
}

export default StreamCounter;