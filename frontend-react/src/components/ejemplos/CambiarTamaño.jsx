import {useState} from 'react';

function CambiarTamaño() {
    const [tamaño, setTamaño] = useState(16);

function aumentarTamaño() {
    setTamaño(tamaño + 1);
}

function disminuirTamaño() {
    setTamaño(tamaño - 1);
}

    return(
        
        <><h2 style={{ fontSize: `${tamaño}px` }}>AJUSTE DE TAMAÑO</h2>
        <button  onClick={aumentarTamaño}>Aumentar Tamaño</button>
        <button  onClick={disminuirTamaño}>Disminuir Tamaño</button></>
        
        
    )
}

export default CambiarTamaño;