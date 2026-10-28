import Alumnos from './pages/Alumnos';
import FAQ from './pages/FAQ';
import {Routes, Route} from "react-router-dom";
import LayoutPpal from './components/LayoutPpal';
import Inicio from './pages/Inicio';
import Docentes from "./pages/Docentes";
function App()
{

  return (
    <>
    <Routes>
      <Route path="/" element={<LayoutPpal />}>
      <Route index element={<Inicio />} />
      <Route path="/alumnos" element={<Alumnos />} />
      <Route path="/ayuda" element={<FAQ />} />
      <Route path="/docentes" element={<Docentes />} />
      </Route>
    </Routes>
    </>
  )
}
export default App