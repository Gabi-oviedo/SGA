//import Pantalla from "./components/ejemplos/Pantalla";
import { useEffect, useState } from "react";
function App()
{

  const [nombre, setNombre] = useState("");
  useEffect(() => {
    if (nombre) {
      document.title = document.title = `hola ${nombre}`;
    }else{
      document.title = "React App";
    }
  }, [nombre]);

  return (
    <>
    <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ingrese su nombre"></input>
    <h2>Hola, {nombre}!</h2>
    </> 
  )
}
export default App