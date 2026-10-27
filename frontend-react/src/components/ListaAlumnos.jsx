import { useEffect, useState } from "react"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno }) {
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarAlumno(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onAlumnoCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo elimnar alumno")
        }
    }
    useEffect(() => {
        async function cargarAlumnos(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de alumnos.")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    }, [actualizar])

    if (cargando) {
        return <p className="sga-list-state">Cargando alumnos...</p>
    }
    if (error) {
        return <p className="sga-list-state sga-list-error" role="alert">{error}</p>
    }
    return (
    <section className="sga-lista">
    <div className="sga-section-heading">
        <span className="sga-eyebrow">Directorio</span>
        <h2>Alumnos</h2>
    </div>
    {alumnos.length === 0 
    ? (<p className="sga-list-state">No hay alumnos registrados.</p>)
    : ( 
        <ul className="sga-list-items">
        {alumnos.map(alumno => (
            <li className="sga-list-item" key={alumno.legajo}>
            <div className="sga-student-info">
                <span className="sga-student-number">Legajo {alumno.legajo}</span>
                <strong>{alumno.nombre}</strong>
                <span>{alumno.carrera}</span>
            </div>
            <div className="sga-student-actions">
            <button
            className="sga-button sga-button-secondary"
            type="button"
            onClick={() => onEditarAlumno(alumno)}>
                Editar
            </button>
            <button 
            className="sga-button sga-button-danger"
            type="button"
            onClick={()=> eliminarAlumno(alumno.legajo)}
            >
                Eliminar
            </button>
            </div>
        </li>)
    )}
    </ul>
    )}
    </section>
    )
}