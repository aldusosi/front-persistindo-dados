import { React, useState, useEffect, useRef } from 'react'

const Stopwatch = () => {
    const [cronometro, setCronometro] = useState(0);
    const intervalId = useRef(null);
    const pause = useRef(true)

    function startCronometro() {
        if (pause.current === true) {
            intervalId.current = setInterval(() => setCronometro(prevCronometro => prevCronometro + 1), 1000)
            pause.current = false;
        }
    };

    function pauseCronometro() {
        clearInterval(intervalId.current);
        pause.current = true
    };

    function finishCronometro() {
        setCronometro(0)
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


    return (

        <div className="grid-container">
            <div className="watch"><p>{String(cronometro).padStart(4, '0')}</p></div>
            <button onClick={startCronometro}><div className="start">Começar</div></button>
            <button onClick={pauseCronometro}> <div className="pause">Pausar </div></button>
            <button onClick={finishCronometro}> <div className="finish">Finalizar </div></button>
            <button onClick={rerunCronometro}><div className="restart">Reiniciar </div></button>
        </div>

    )
}

export default Stopwatch


// - Começar crônometro (começa a contagem) ok
// - Pausar crônometro (pausa a contagem) ok
// - Finalizar crônometro (volta a contagem a 0 e para ela)
// - Reiniciar crônometro (volta a contagem a 0)
// - Trocar tema (claro e escuro)