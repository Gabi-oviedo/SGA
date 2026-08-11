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
    email: correo
}

const alumnos = obteneralumnos()
alumnos.push(alumno)

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

function mostrarAlumnos(alumnos){
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos){
        listaAlumnos.innerHTML += `
        <li>
             ${alumno.nombre} - ${alumno.carrera} - ${alumno.email} 
        </li>`;
    }

}





