import Alumnos from './pages/Alumnos';
import FAQ from './pages/FAQ';
import SelectorTema from './components/SelectorTema';
import {Routes, Route} from "react-router-dom";
import LayoutPpal from './components/LayoutPpal';
import Inicio from './pages/Inicio';
function App()
{

  return (
    <>
    <Routes>
      <Route path="/" element={<LayoutPpal />}>
      <Route index element={<Inicio />} />
      <Route path="/alumnos" element={<Alumnos />} />
      <Route path="/ayuda" element={<FAQ />} />
      </Route>
    </Routes>
    <SelectorTema />
    </>
  )
}
export default App