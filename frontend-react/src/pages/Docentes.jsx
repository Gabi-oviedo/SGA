import {ListaDocente} from '../components/ListaDocente';
import { useState } from 'react';
import  FormularioD  from '../components/FormularioD';
export default function Docentes() {
const [actualizar, setActualizar] = useState(0)
const [docenteEditar, setDocenteEditar] = useState(null)

function docenteCreado() {
  setActualizar(valor => valor + 1)
  setDocenteEditar(null)
}

function seleccionarDocente(docente) {
  setDocenteEditar(docente)
}

return (
   <>
     
     {/* <EjemploMUI />  */}
   <FormularioD key={docenteEditar?.DNI ?? "nuevo"}
   onDocenteCreado={docenteCreado}
   docenteEditar={docenteEditar}
   onCancelar={() => setDocenteEditar(null)}
   />
   <ListaDocentes 
   actualizar={actualizar} 
   onDocenteCreado={docenteCreado}
   onEditarDocente={seleccionarDocentet} 
   /> 
  </>
  )}