import{Alert,Box,Button,TextField,Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";

export default function Login() {

    const theme = useTheme();
    const [usuario,setUsuario] = useState(null);

    const [error,setError] = useState("");
    const [cargando,setCargando] = useState(false);
    const [mensaje,setMensaje] = useState("");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function login(e){
        e.preventDefault();
        setError("");
        setMensaje("");
        setCargando(true);
        setUsuario(null);

        try{
            const respuesta = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const datos = await respuesta.json();
            if(!respuesta.ok){
                setError(datos.message || "Error al iniciar sesión");
            } else {
                setUsuario(datos.usuario);
                setMensaje("Inicio de sesión exitoso");
            }
        } catch (error) {
            setError("Error al conectar con el servidor");
        } finally {
            setCargando(false);
        }
    }

    return (
        <Box component="form" onSubmit={login} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {mensaje && <Alert severity="success">{mensaje}</Alert>}
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" disabled={cargando}>
                {cargando ? "Cargando..." : "Iniciar sesión"}
            </Button>
        </Box>
    );
}