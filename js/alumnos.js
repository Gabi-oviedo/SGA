/*  const alumnos = [
    {
        id: 1,
        nombre: "Ana"
    },
    {
        id: 2,
        nombre: "José"
    }
];
iniciar();  */

/* function obtenerAlumnos(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(alumnos)
        }, 2000);
    })
}
async function iniciar(){
    const datos = await obtenerAlumnos()
    console.table(datos)
} */
 

//crear obtenerMaterias()
 /* const materias = [
    {
        id: 1,
        nombre: "matematica"
    },
    {
        id: 2,
        nombre: "ingles"
    }
];
function obtenerMaterias(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(materias)
        }, 2000);
    })
}
async function iniciar(){
    const datos = await obtenerMaterias()
    console.table(datos)
}
iniciar();  */

//crear obtenerDocentes()
/*  const docentes = [
    {
        id: 1,
        nombre: "profesor"
    },
    {
        id: 2,
        nombre: "profesora"
    }
];
function obtenerDocentes(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(docentes)
        }, 2000);
    })
}
async function iniciar(){
    const datos = await obtenerDocentes()
    console.table(datos)
}
iniciar();  */
//mostrar los datos a traves de async o await


/* async function obtenerAlumnos(){
    const respuesta =  await fetch ("https://jsonplaceholder.typicode.com/users")
    const alumnos = await respuesta.json()
    return alumnos
}

function mostrarAlumnos(alumnos){
     //console.table(alumnos)
    console.log(typeof alumnos) 
    localStorage.setItem("alumnos", JSON.stringify(alumnos))
    const datos = localStorage.getItem("alumnos")
    console.log(typeof datos)
    const alumnosrecuperados = JSON.parse(datos)
    console.log(typeof alumnosrecuperados)

 for (const alumno of alumnos){
        console.log(alumno.name, alumno.email)
    } 
    
}
async function iniciar(){
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
}
iniciar()
 */

const formulario = document.querySelector("#formAlumno")
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoId = null;
formulario.addEventListener("submit", function(event){
    event.preventDefault()

const nombre = document.querySelector("#nombre").value
const carrera = document.querySelector("#carrera").value
const  correo = document.querySelector("#correo").value

if (nombre === "" || carrera === "" || correo === ""){
    mostrarmensaje("Todos los campos son obligatorios", "mje-error")
    return
}

if (!correo.includes("@")){
    mostrarmensaje("El correo no es válido", "mje-error")
    return
}

if (!correo.includes(".com")){
    mostrarmensaje("El correo no es válido", "mje-error")
    return
}

if (nombre.length < 3) {
    mostrarmensaje("El nombre no es válido", "mje-error")
    return
}

const alumnos = obteneralumnos()

if (alumnoEditandoId === null){
const alumno = {
    id: Date.now() ,
    nombre: nombre,
    carrera: carrera,
    correo: correo
}
alumnos.push(alumno)
mostrarmensaje("Alumno guardado correctamente", "mje-exito")
} else {
    const alumno = alumnos.find(alumno => alumno.id === alumnoEditandoId)
    alumno.nombre = nombre
    alumno.carrera = carrera
    alumno.correo = correo
    alumnoEditandoId = null
    formulario.querySelector("button").textContent = "Agregar Alumno"

    mostrarmensaje("Alumno actualizado correctamente", "mje-exito")
}


localStorage.setItem("alumnos", JSON.stringify(alumnos))
mostrarAlumnos(alumnos)
formulario.reset()
});

function obteneralumnos(){
    const datos = localStorage.getItem("alumnos")
    if(datos){
        return JSON.parse(datos)
    }
  return []
    
}

function mostrarmensaje(texto, tipo){
    mensaje.textContent = texto;
    mensaje.className = tipo
    setTimeout(() => {
       mensaje.textContent = " "
       mensaje.className = "oculto"
    }, 2000);
}

function mostrarAlumnos(alumnos){
    listaAlumnos.innerHTML = ""

    for (const alumno of alumnos){
        listaAlumnos.innerHTML += `
            <tr>
                <td>${alumno.id}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.carrera}</td>
                <td>${alumno.correo}</td>
                <td>
                    <button class="btn-editar" data-id="${alumno.id} "title= "Editar Alumno"> <i class="fa-solid fa-pen" ></i></button>
                    <button class="btn-eliminar" data-id="${alumno.id}" title= "Eliminar alumno"> <i class="fa-solid fa-trash"></i> </button>
                </td>
            </tr>
        `;
    }
}

function eliminarAlumno(id){
    const alumnos = obteneralumnos()
    const alumnosActuales = alumnos.filter(alumno => alumno.id != id);
    localStorage.setItem("alumnos", JSON.stringify(alumnosActuales));
    mostrarAlumnos(alumnosActuales);
    if (alumnoEditandoId === id) {
        formulario.reset();
        alumnoEditandoId = null;
        formulario.querySelector("button").textContent = "Agregar Alumno";
    }
    mostrarmensaje("Alumno eliminado correctamente", "mje-exito");
}

listaAlumnos.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar");
    if (boton_el) {
       const id = Number(boton_el.dataset.id)
       const confirmar = confirm("¿Estás seguro de eliminar este alumno?")
     if (confirmar){  
        eliminarAlumno(id)
     }  
       
    }

    const boton_edit = e.target.closest(".btn-editar");
    if (boton_edit) {
        const id = Number(boton_edit.dataset.id)
        editarAlumno(id)
    }
})

function editarAlumno(id){
    //obtener alumnos
    const alumnos = obteneralumnos()
    //filtrar alumnos
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;
    alumnoEditandoId = id;
    formulario.querySelector("button").textContent = "Actualizar Alumno"
    document.querySelector("#nombre").focus();
}

const alumnos = obteneralumnos()
mostrarAlumnos(alumnos)

