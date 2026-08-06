const alumnos = [
    {
        id: 1,
        nombre: "José"
    },
    {
        id: 2,
        nombre: "Jerardo"
    },
    {
        id: 3,
        nombre: "Jamez"
    }
];

function obtenerAlumnos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(alumnos);
        }, 3000);
    })
}

obtenerAlumnos().then((e) => {
    console.log(e);
})

async function iniciar() {
    const datos = await obtenerAlumnos();
    console.log(datos);
}

iniciar();



// Crear obtenerMaterias() y obtenerDocentes() para luego mostrar los datos a travez de async/await

function obtenerMaterias() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Matematicas", "Geografia", "Ingles"]);
        }, 3000);
    })
}

function obtenerDocentes() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Mariela", "Cristina", "Segio"]);
        }, 3000);
    })
}

async function iniciar() {
    const materias = await obtenerMaterias();
    const profesores = await obtenerDocentes();
    console.log(materias);
    console.log(profesores);
}

iniciar();