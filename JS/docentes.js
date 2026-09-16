const formulario = document.querySelector("#formulario")
const mensaje = document.querySelector("#mensaje")
const listaDocentes = document.querySelector("#listaDocentes")
let docenteEditandoId = null;
let docenteEditar = null;
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"


formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim()
    const especialidad = document.querySelector("#especialidad").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || especialidad === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electrónico válido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }

    const docentes = obtenerAlumnos()

    if (DocenteEditandoId === null) {
        const docente = {
            id: Date.now(),
            nombre: nombre,
            especialidad: especialidad,
            correo: correo
        }
        docentes.push(docente)
        mostrarMensaje("docente guardado correctamente", "mje-exito")
    } else {
        const docente = docentes.find(docente => docente.id === docenteEditandoId)
        docente.nombre = nombre
        docente.especialidad = especialidad
        docente.correo = correo
        const datosActuales = {
            nombre: nombre,
            especialidad: especialidad,
            correo: correo
        }
        /* if(datosActuales.nombre === alumnoEditar.nombre && datosActuales.carrera === alumnoEditar.carrera && datosActuales.correo === alumnoEditar.correo){
            mostrarMensaje("No se han realizado cambios", "mje-error")
            return
        } */
       if(JSON.stringify(datosActuales) === JSON.stringify(docenteEditar)){
            mostrarMensaje("No se han realizado cambios", "mje-adv")
            return
       }
        docenteEditandoId = null
        formulario.querySelector("button").textContent = "Guardar docente"

        mostrarMensaje("docente actualizado correctamente", "mje-exito")
    }
    localStorage.setItem("docentes", JSON.stringify(docentes))
    mostraDocentes(docentes)
    formulario.reset()
});


function obtenerDocentes() {
   return obtenerDatos("docentes")
}

function mostrarDocentes(docentes) {
    listaDocentes.innerHTML = ""
    for (const docente of docentes) {
        listaDocentes.innerHTML += `
        <tr>
            <td>${docente.id}</td>
            <td>${docente.nombre}</td>
            <td>${docente.especialidad}</td>
            <td>${docente.correo}</td>
            <td>
                <button 
                class="btn-editar" 
                data-id="${docente.id}"
                title="Editar docente">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-id="${docente.id}"
                title="Eliminar docente">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}
function eliminarDocente(id) {
    const docentes = obtenerDocentes()
    const docentesActualizados = docentes.filter(
        docente => docente.id !== id
    );
    localStorage.setItem("docentes", JSON.stringify(docentesActualizados))
    mostrarDocentes(docentesActualizados)
    if (docenteEditandoId === id){
        formulario.reset()
        docenteEditandoId = null
        formulario.querySelector("button").textContent = "Guardar docente"
    }
    mostrarMensaje("docente eliminado correctamente", "mje-exito")
}

listaDocentes.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar")
    if (boton_el) {
        const id = Number(boton_el.dataset.id)
        const confirmar = confirm("¿Está seguro de eliminar este docente?")
        if (confirmar) {
        eliminarDocente(id)
        }
    }
    const boton_ed = e.target.closest(".btn-editar")
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id)
        editarDocente(id)
    }
})

function editarDocente(id) {
    const docentes = obtenerDocentes()
    const docente = docentes.find(docente => docente.id === id)
    document.querySelector("#nombre").value = docente.nombre;
    document.querySelector("#especialidad").value = docente.especialidad;
    document.querySelector("#correo").value = docente.correo;
    docenteEditar = {
        nombre: docente.nombre,
        carrera: docente.especialidad,
        correo: docente.correo
    }
    
    docenteEditandoId = id;
    btnCancelar.style.display ="inline-block"
    formulario.querySelector("button").textContent = "Actualizar docente"
    document.querySelector("#nombre").focus()
}

function CancelarEdicion(){
    formulario.reset()
    docenteEditandoId = null;
    docenteEditar = null;
    formulario.querySelector("button").textContent = "Guardar docente"
    btnCancelar.style.display ="none";
    document.querySelector("#nombre").focus()
}
btnCancelar.addEventListener("click", CancelarEdicion)
const docentes = obtenerDocentes()
mostrarDocentes(docentes)  