import {useState} from 'react';

function Mensaje(){
    const [mensaje, setMensaje] = useState("Hola,wachin");



    return(
        <>
       <h2>{mensaje}</h2>
       <div>
        <button onClick={() => setMensaje("Bienvenidos a programacion IV")}>Cambiar Mensaje</button>
       </div>
        
        </>
    )
}

export default Mensaje;