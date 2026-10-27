import { useState } from "react";
import {Alert, Button, Box, Paper, TextField, Typography} from "@mui/material"
const API_DOCENTES = "http://localhost:3000/docentes"

function FormularioD({ onDocenteCreado, docenteEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        DNI: String(docenteEditar?.DNI ?? ""),
        nombre: docenteEditar?.nombre ?? "",
        especialidad: docenteEditar?.especialidad ?? "",
        correo: docenteEditar?.correo ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setGuardando(true)
        
    const docente = {
        ...formulario,
        DNI: String(formulario.DNI)
    }
    const editando = Boolean(docenteEditar)
    const url = editando 
                ? `${API_DOCENTES}/${docenteEditar.DNI}`
                : API_DOCENTES
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(docente)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el docente. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                DNI: "",
                nombre: "",
                especialidad: "",
                correo: ""
            })
            onDocenteCreado()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <section className="sga-formulario">
        <div className="sga-section-heading">
            <span className="sga-eyebrow">Docentes</span>
            <h2>{docenteEditar ? "Editar docente" : "Nuevo Docente"}</h2>
        </div>
        <form className="sga-form-grid" onSubmit={guardar}>
            <div className="sga-form-field">
            <label htmlFor="DNI">DNI</label>
            <input
            id="DNI"
            name="DNI"
            value={formulario.DNI}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="sga-form-field">
            <label htmlFor="nombre">Nombre</label>
            <input
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="sga-form-field">
            <label htmlFor="especialidad">Especialidad</label>
            <input
            id="especialidad"
            name="especialidad"
            value={formulario.especialidad}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="sga-form-field">
            <label htmlFor="correo">Correo</label>
            <input
            id="correo"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            required
            />
            </div>
            <div className="sga-form-actions">
            <button className="sga-button sga-button-primary" type="submit" disabled={guardando}>
                {guardando 
                ? "Guardando..." 
                : docenteEditar 
                    ? "Guardar cambios"
                    : "Guardar"}
            </button>
            {docenteEditar && (
                <button
                className="sga-button sga-button-secondary"
                type="button"
                onClick={cancelar}
                disabled={guardando}
                >
                    Cancelar
                </button>
            )}
            </div>
            {error && <p className="sga-form-error" role="alert">{error}</p>}
        </form>
        </section>
    )
}
export default FormularioD