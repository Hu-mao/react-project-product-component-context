import { useEffect, useState } from "react";

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev >= 60) {
                    return 0;
                }
                return prev + 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <h2>Секунди: {seconds}</h2>;
}

export default Timer;