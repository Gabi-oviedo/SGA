import {useState} from 'react';

export function Adivina() {

    const[seleccion, setSeleccion] = useState("");
    const[resultado, setResultado] = useState("");

    function sortear(){
        const valorIngresado = seleccion.trim();
        const ganador = Math.floor(Math.random() * 10) + 1;
        const elegido = Number(valorIngresado);

        if (valorIngresado === ""){
            setResultado("Por favor, ingresa un número del 1 al 10.");
            setSeleccion("");
            return;
        }
        if (Number.isNaN(elegido) || elegido < 1 || elegido > 10){
            setResultado("Por favor, ingresa un número válido del 1 al 10.");
            setSeleccion("");
            return;
        }
        
        if (elegido === ganador){
            setResultado("¡Felicidades! Has adivinado el número.");
            setSeleccion("");
        } else {
            setResultado(`Lo siento, el número era ${ganador}.`);
            setSeleccion("");
        }

        setSeleccion("");
    }

    return(
        <>
        <h2>Adivina el número</h2>
        <input type="number" value={seleccion} onChange={(e) => setSeleccion(e.target.value)} placeholder="Ingresa un número del 1 al 10" />
        <button onClick={sortear}>Adivinar</button>
        <p>{resultado}</p>
        </>
    )
}

export default Adivina;