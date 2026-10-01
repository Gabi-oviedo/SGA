import {useState} from 'react';
function Incrementar() {
   const [contador, setContador] = useState(0);
    const [mostrar, setMostrar] = useState(false);


    function incremento(){
        setContador(contador + 1);
    }

    function decremento(){
        if (contador > 0) {
            setContador(contador - 1);
        }
        setContador(contador - 1);

    }

    return(
        <>
        <h1>Contador: {contador}</h1>

        <div style ={{display: 'flex' , justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
        <button style ={{fontSize: '14px', width: '35px', height: '40px'}} onClick={incremento}>+</button><br />
        <button style ={{fontSize: '14px', width: '35px', height: '40px'}} onClick={decremento}>-</button><br />
        </div> <br />

        <button onClick={() => setMostrar(!mostrar)}>Mostrar/Ocultar</button> <br />
        {mostrar && <p>Información adicional</p>}

        </>
    )
}

export default Incrementar;