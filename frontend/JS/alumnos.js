
const formulario = document.querySelector("#formulario")
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoLegajo = null
let alumnoEditar = null
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"
const btnGuardar = document.querySelector("#btnGuardar")
const API_ALUMNOS = "http://localhost:3000/alumnos";

formulario.addEventListener("submit",  async function (event) {
    event.preventDefault();
    const legajo = document.querySelector("#legajo").value.trim()

    if (legajo === "") {
        mostrarMensaje("El legajo es obligatorio", "mje-error")
        return
    }
    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || carrera === "" || correo === "") {
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

    if (alumnoEditandoLegajo === null) {
        const alumno = {
            legajo: Number(legajo),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        
        const respuesta = await fetch(API_ALUMNOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alumno)
        })
        
        if (!respuesta.ok) {
            mostrarMensaje("Error al guardar el alumno", "mje-error")
            return
        }
        

        mostrarMensaje("Alumno guardado correctamente", "mje-exito")
    } else {
        const alumno = alumnos.find(alumno => alumno.legajo === alumnoEditandoLegajo)
        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo

        const datosActuales = {
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        
        if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)){
            mostrarMensaje("No se realizaron cambios", "mje-adv")
            return
        }
        const respuesta = await fetch(`${API_ALUMNOS}/${alumnoEditandoLegajo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombe: nombre,
                carrera: carrera,
                correo: correo
            })
        })

        if (!respuesta.ok) {
            mostrarMensaje("Error al actualizar el alumno", "mje-error")
            return
        }

        alumnoEditandoLegajo = null
        alumnoEditar = null
        btnGuardar.textContent = "Guardar Alumno"
        document.querySelector("#legajo").disabled = false
        btnCancelar.style.display = "none"
        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }
    // localStorage.setItem("alumnos", JSON.stringify(alumnos))
    guardarDatos("alumnos", alumnos)
    const alumnosActualizados = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
    formulario.reset()
});


async function obtenerAlumnos() {
    const respuesta = await fetch(API_ALUMNOS)
    const alumnos = await respuesta.json()
    return alumnos
}



function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.legajo}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button 
                class="btn-editar" 
                data-id="${alumno.legajo}"
                title="Editar alumno">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-id="${alumno.legajo}"
                title="Eliminar alumno">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}
async function eliminarAlumno(legajo) {
    const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, {
        method: "DELETE"
    })
    const alumnos = await obtenerAlumnos()
    if (!respuesta.ok) {
        mostrarMensaje("Error al eliminar el alumno", "mje-error")
        return
    }
   
    localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados))
    mostrarAlumnos(alumnosActualizados)
    if (alumnoEditandoId === id){
        formulario.reset()
        alumnoEditandoId = null
        btnGuardar.textContent = "Guardar alumno"
    }
    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
}

listaAlumnos.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar")
    if (boton_el) {
        const id = Number(boton_el.dataset.id)
        const confirmar = confirm("¿Está seguro de eliminar este alumno?")
        if (confirmar) {
        eliminarAlumno(id)
        }
    }
    const boton_ed = e.target.closest(".btn-editar")
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id)
        editarAlumno(id)
    }
})

function editarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;

    alumnoEditar = {
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }

    alumnoEditandoId = id;
    btnCancelar.style.display ="inline-block"

    btnGuardar.textContent = "Actualizar Alumno"
    document.querySelector("#nombre").focus()
}

function cancelarEdicion(){
    formulario.reset()
    alumnoEditandoId = null
    alumnoEditar = null
    btnGuardar.textContent = "Guardar Alumno"
    btnCancelar.style.display = "none"
    document.querySelector("#nombre").focus()
}

btnCancelar.addEventListener("click", cancelarEdicion)

async function iniciar() {
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)  
}

iniciar()