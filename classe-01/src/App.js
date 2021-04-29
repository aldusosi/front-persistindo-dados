import { useState } from 'react';
import './App.css';

let contagem = null;
let pausado = false;
let iniciado = false;
let modo = "claro";

function App() {
  let [horas, setHoras] = useState(0);
  let [minutos, setMinutos] = useState(0);
  let [segundos, setSegundos] = useState(0);
  let [tema, setTema] = useState(<i className="fas fa-sun"></i>);

  const cronometro = `${horas.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${minutos.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${segundos.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;

  function contar() {
    if(minutos === 60) {
      setHoras(horas += 1);
      setMinutos(minutos = 0);
      setSegundos(segundos = 0);
    }
    else if(segundos === 59) {
      setMinutos(minutos += 1);
      setSegundos(segundos = 0);
      console.log(`${minutos} minutos se passaram`);
    }
    else {
      setSegundos(segundos += 1);
      console.log(`${segundos} segundos se passaram`);
    }

    return () => {
      clearInterval(contagem);
    }
  }

  function iniciar() {
    if(iniciado && !pausado) {
      contagem = setInterval(contar, 1000);
    }
    else {
      console.log("Cronômetro iniciado");
      iniciado = true;
      pausado = false;
      contagem = setInterval(contar, 1000);
      contar()
    }
  }

  function pausar() {
    pausado = true;
    console.log("Cronômetro pausado");
    checarEstado();
  }

  function zerar() {
    clearInterval(contagem);
    setHoras(horas = 0);
    setMinutos(minutos = 0);
    setSegundos(segundos = 0);
    console.log("Cronômetro reiniciado");
    checarEstado();
  }

  function finalizar() {
    iniciado = false;
    pausado = false;
    setHoras(horas = 0);
    setMinutos(minutos = 0);
    setSegundos(segundos = 0);
    console.log("Cronômetro finalizado");
    checarEstado();
  }

  function checarEstado() {
  if (iniciado && !pausado) {
      iniciar();
    }
    else {
      clearInterval(contagem);
    }
  }

  function modoND() {
    if(modo === "claro") {
      modo = "escuro";
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      setTema(tema = <i className="fas fa-moon"></i>);
    }
    else {
      modo = "claro";
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      setTema(tema = <i className="fas fa-sun"></i>);
    }

  }

  return (
    <main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.css"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />

      <div>
        <h1>Cronômetro</h1>
      </div>
      <article>
        <p>{cronometro}</p>
        <section>
        <button onClick={iniciar}><i className="fas fa-play"></i></button>
        <button onClick={pausar}><i className="fas fa-pause"></i></button>
        <button onClick={zerar}><i className="fas fa-redo"></i></button>
        <button onClick={finalizar}><i className="fas fa-stop"></i></button>
        <section>
          <button onClick={modoND}>{tema}</button>
        </section>
      </section>
      </article>
    </main>
  );
}

export default App;
