import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const API_MATERIAS = "https://sinister-cadaver-9746xrrrvqg42pvrg-3000.app.github.dev/materias"

export function ListaMaterias({ actualizar, onMateriaCreada, onEditarMateria }) {
    const [materias, setMaterias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [mensaje, setMensaje] = useState("")
    const [error, setError] = useState("")

    async function eliminarMateria(codigo) {
        const confirmar = window.confirm("¿Seguro que querés eliminar esta materia?")
        if (!confirmar) {
            return
        }
        try {
            setMensaje("")
            setError("")
            const respuesta = await fetch(`${API_MATERIAS}/${codigo}`,
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onMateriaCreada()
            setMensaje("Materia eliminada correctamente")
        } catch (error) {
            console.error("Error al eliminar: ", error)
            
            setError(error.message || "No se pudo eliminar la materia")
        }
    }
    useEffect(() => {
        async function cargarMaterias() {
            setCargando(true)
            setError("")

            try {
                const respuesta = await fetch(API_MATERIAS)

                if (!respuesta.ok) {
                    throw new Error(`No se pudo obtener la lista. Estado HTTP: ${respuesta.status}`)
                }

                const datos = await respuesta.json()
                setMaterias(datos)
            } catch (error) {
                console.error("Error de conexión", error)
                setError("No se pudo cargar la lista de materias.")
            } finally {
                setCargando(false)
            }
        }
        cargarMaterias()
    }, [actualizar])

    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando materias...</Typography>
            </Paper>
        )
    }
    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Materias
            </Typography>
            {error && <Alert severity="error" role="alert">{error}</Alert>}
            {mensaje && <Alert severity="success">{mensaje}</Alert>}            
            {materias.length === 0
                ? (
                    <Typography color="text.secondary">
                        No hay materias registradas.
                    </Typography>
                )
                : (
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                    >
                        {materias.map(materia => (
                            <Paper
                                component="li"
                                key={materia.codigo}
                                elevation={0}
                                sx={{
                                    p: { xs: 2, sm: 2.5 },
                                    border: 1,
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: { xs: "stretch", sm: "center" },
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 2
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{ alignItems: "center", flexWrap: "wrap" }}
                                >
                                    <Chip label={`codigo ${materia.codigo}`} color="primary" variant="outlined" size="small" />
                                    <Box>
                                        <Typography fontWeight={600}>
                                            {materia.nombre}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {materia.descripcion}
                                        </Typography>

                                        <Typography variant="body2">
                                            Carga horaria: {materia.cargaHoraria}
                                        </Typography>

                                        <Typography variant="body2">
                                            Estado: {materia.estado}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    <Button
                                        type="button"
                                        onClick={() => onEditarMateria(materia)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => eliminarMateria(materia.codigo)}
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                    >
                                        Eliminar
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
        </Paper>
    )
}