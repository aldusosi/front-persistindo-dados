import { React, useState, useEffect, useRef } from 'react'

const Stopwatch = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const intervalId = useRef(null);
    const pause = useRef(true)
    const dark = useRef(true)


    function startCronometro() {
        if (pause.current === true) {
            intervalId.current = setInterval(() => setSeconds(prevCronometro => prevCronometro + 1), 1000)
            pause.current = false;
        }
    };

    function pauseCronometro() {
        clearInterval(intervalId.current);
        pause.current = true
    };

    function finishCronometro() {
        setMinutes(0)
        setSeconds(0)
        pauseCronometro()
    }

    function rerunCronometro() {
        finishCronometro()
        startCronometro()
    }


    useEffect(() => {
        return () => {
            clearInterval(intervalId.current);
        };
    }, []);

    useEffect(() =>{
        if (seconds === 60){
        setMinutes(minutes +1)
        setSeconds(0)}
    })


    return (

        <div className={"grid-container"}>
            <div className="watch"><p className="p-light">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p></div>
            <button onClick={startCronometro} className={"start", "button-light"}><div>Começar</div></button>
            <button onClick={pauseCronometro} className={"pause", "button-light"}> <div>Pausar </div></button>
            <button onClick={finishCronometro} className={"finish", "button-light"}> <div>Finalizar </div></button>
            <button onClick={rerunCronometro} className={"restart", "button-light"}><div>Reiniciar </div></button>
        </div>

    )
}

export default Stopwatch


// - Começar crônometro (começa a contagem) ok
// - Pausar crônometro (pausa a contagem) ok
// - Finalizar crônometro (volta a contagem a 0 e para ela)
// - Reiniciar crônometro (volta a contagem a 0)
// - Trocar tema (claro e escuro)