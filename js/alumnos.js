/* const alumnos = [
    {
        id: 1,
        nombre: "Ana"
    },
    {
        id: 2,
        nombre: "José"
    }
];
function obtenerAlumnos(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(alumnos)
        }, 2000);
    })
}
async function iniciar(){
    const datos = await obtenerAlumnos()
    console.table(datos)
}
iniciar(); */

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
iniciar(); */
//crear obtenerDocentes()
/* const docentes = [
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
iniciar(); */
//mostrar los datos a traves de async o await

async function obtenerAlumnos(){
    const respuesta =  await fetch ("https://jsonplaceholder.typicode.com/users")
    const alumnos = await respuesta.json()
    return alumnos
}

function mostrarAlumnos(alumnos){
    /* console.table(alumnos)
    console.log(alumnos[0].id) */
    for (const alumno of alumnos){
        console.log(alumno.name, alumno.email)
    }
}

async function iniciar(){
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
}
iniciar()