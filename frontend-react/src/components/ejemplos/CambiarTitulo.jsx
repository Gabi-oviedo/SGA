import {useState} from 'react';

function CambiarTitulo() {
    const [titulo, setTitulo] = useState("Inicio");
    
    
    return(
        <>
    <h2>{titulo}</h2>
    <div style ={{display: 'flex' , justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
    <button style ={{fontSize: '14px', width: '100px', height: '45px'}} onClick={() => setTitulo("Alumnos")}>Ver Alumno</button>
    <button style ={{fontSize: '14px', width: '100px', height: '45px', color: 'black'}} onClick={() => setTitulo("Docentes")}>Ver Docente</button>

    </div>

    </>
)

}

export default CambiarTitulo;