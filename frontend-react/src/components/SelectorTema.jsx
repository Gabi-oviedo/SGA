import Box from "@mui/material/Box"; import { useColorScheme } from "@mui/material/styles"; import MaterialUISwitch from "./MaterialUISwitch";

function SelectorTema() { const { mode, setMode } = useColorScheme();

if (!mode) { return null; }

const modoOscuro = mode === "dark";

function cambiarModo(event) { setMode(event.target.checked ? "dark" : "light"); }

return ( <Box sx={{ position: "absolute", top: 14, right: 12, zIndex: 2, display: "flex", justifyContent: "flex-end", width: "auto" }}

>
  <MaterialUISwitch
    checked={modoOscuro}
    onChange={cambiarModo}
    slotProps={{
      input: {
        "aria-label": "Cambiar entre modo claro y oscuro",
      },
    }}
  />
</Box>


); }

export default SelectorTema;