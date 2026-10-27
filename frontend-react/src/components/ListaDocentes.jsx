import { useEffect, useState } from "react"
const API_DOCENTES = "http://localhost:3000/docentes"

export function ListaDocentes({ actualizar, onDocenteCreado, onEditarDocente }) {
    const [docentes, setDocentes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarDocente(DNI){
        const confirmar = window.confirm("¿Seguro que querés eliminar este docente?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_DOCENTES}/${DNI}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onDocenteCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo eliminar docente")
        }
    }
    useEffect(() => {
        async function cargarDocentes(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_DOCENTES)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setDocentes(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de docentes.")
        } finally {
            setCargando(false)
        }
    }
        cargarDocentes()
    }, [actualizar])

    if (cargando) {
        return <p className="sga-list-state">Cargando docentes...</p>
    }
    if (error) {
        return <p className="sga-list-state sga-list-error" role="alert">{error}</p>
    }
    return (
    <section className="sga-lista">
    <div className="sga-section-heading">
        <span className="sga-eyebrow">Directorio</span>
        <h2>Docentes    </h2>
    </div>
    {docentes.length === 0 
    ? (<p className="sga-list-state">No hay docentes registrados.</p>)
    : ( 
        <ul className="sga-list-items">
        {docentes.map(docente => (
            <li className="sga-list-item" key={docente.DNI}>
            <div className="sga-docente-info">
                <span className="sga-docente-number">DNI {docente.DNI}</span>
                <strong>{docente.nombre}</strong>
                <span>{docente.especialidad}</span>
            </div>
            <div className="sga-docente-actions">
            <button
            className="sga-button sga-button-secondary"
            type="button"
            onClick={() => onEditarDocente(docente)}>
                Editar
            </button>
            <button 
            className="sga-button sga-button-danger"
            type="button"
            onClick={()=> eliminarDocente(docente.DNI)}
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