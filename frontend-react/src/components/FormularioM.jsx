import { useState } from "react";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
const API_MATERIAS = "https://sinister-cadaver-9746xrrrvqg42pvrg-3001.app.github.dev/materias";

function FormularioM({ onMateriaCreada, materiaEditar, onCancelar }) {
    const [formulario, setFormulario] = useState({
        codigo: String(materiaEditar?.codigo ?? ""),
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: materiaEditar?.cargaHoraria ?? "",
        estado: materiaEditar?.estado ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)
    const [exito, setExito] = useState("")

    function manejarCambio(e) {
        const { name, value } = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        const codigo = formulario.codigo.trim()
        const nombre = formulario.nombre.trim()
        const descripcion = formulario.descripcion.trim()
        const cargaHoraria = formulario.cargaHoraria.trim()

        if (!codigo || !nombre || !descripcion || !cargaHoraria || !formulario.estado) {
            setError("Todos los campos son obligatorios.")
            return
        }

        if (nombre.length < 4 || nombre.length > 30) {
            setError("El nombre debe tener entre 4 y 30 caracteres.")
            return
        }

        if (!/^[1-9]\d*$/.test(cargaHoraria)) {
            setError("La carga horaria debe ser un número entero mayor a cero.")
            return
        }

        if (!["activa", "inactiva"].includes(formulario.estado)) {
            setError("Debe seleccionar un estado válido.")
            return
        }
        setError("")
        setExito("Materia guardada correctamente")
        setGuardando(true)

        const materia = {
            ...formulario,
            codigo: formulario.codigo.trim()
        }
        const editando = Boolean(materiaEditar)
        const url = editando
            ? `${API_MATERIAS}/${materiaEditar.codigo}`
            : API_MATERIAS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(materia)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el materia. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: ""
            })
            onMateriaCreada()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }
    function cancelar() {
        onCancelar()
    }
    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                <TextField
                    id="codigo"
                    name="codigo"
                    label="codigo"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="descripcion"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="cargaHoraria"
                    name="cargaHoraria"
                    label="Carga horaria"
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    required
                    fullWidth
                    slotProps={{
                        htmlInput: { inputMode: "numeric" }
                    }}
                />
                <TextField
                    select
                    id="estado"
                    name="estado"
                    label="Estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                    fullWidth
                >
                    <MenuItem value="activa">
                        Activa
                    </MenuItem>

                    <MenuItem value="inactiva">
                        Inactiva
                    </MenuItem>
                </TextField>
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando
                            ? "Guardando..."
                            : materiaEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {materiaEditar && (
                        <Button
                            type="button"
                            onClick={cancelar}
                            disabled={guardando}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
                {error && (<Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>{error}</Alert>)}
                    {exito && <Alert severity="success">{exito}</Alert>}
            </Box>
        </Paper>
    )
}
export default FormularioM