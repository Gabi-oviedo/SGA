import Titulo from './components/Titulo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TarjetaAlumno from './components/TarjetaAlumno';

function App() {
  return (
    <>
    <Navbar />
    <Titulo texto="Bienvenido al Sistema de Gestión Académica" color = "#ff00ea79" />
    <TarjetaAlumno nombre="Juan Pérez" carrera="Ingeniería en Sistemas" edad="20" />
    <TarjetaAlumno nombre="Gadiel betaverso" carrera="technical papping moves" edad="22" />
    <Footer />
    </>
  )
}

export default App;