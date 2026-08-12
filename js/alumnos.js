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
let alumnoEditandoId = null; 
formulario.addEventListener("submit", function(event){
    event.preventDefault()

const nombre = document.querySelector("#nombre").value
const carrera = document.querySelector("#carrera").value
const  correo = document.querySelector("#correo").value
const listaAlumnos = document.querySelector("#listaAlumnos")

const alumno = {
    id: Date.now() ,
    nombre: nombre,
    carrera: carrera,
    correo: correo
}

const alumnos = obteneralumnos()
alumnos.push(alumno)

localStorage.setItem("alumnos", JSON.stringify(alumnos))

mostrarmensaje("Alumno guardado")

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

function mostrarmensaje(texto){
    mensaje.textContent = texto;
    setTimeout(() => {
       mensaje.textContent = " ";
    }, 2000);
}

function mostrarAlumnos(alumnos){
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos){
        listaAlumnos.innerHTML += `
        <tr>
            <td> ${alumno.nombre}<td/>
            <td> ${alumno.carrera}<td/>
            <td> ${alumno.correo} <td/>
            <td> 
               <button class="btn-editar" data-id="${alumno.id}">Editar</button>
               <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
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
    mostrarmensaje("Alumno eliminado");
}

listaAlumnos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")){
       const id = Number(e.target.dataset.id)
       eliminarAlumno(id) 
        
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
}



