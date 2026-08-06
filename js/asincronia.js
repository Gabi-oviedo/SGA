console.log("Inicio");

setTimeout(() => {
    console.log("Buscando Alumnos...");
}, 3000);
console.log("Fin");

function saludar() {
    console.log("Hola");
}

function ejectuar(funcion) {
    funcion();
}

ejectuar(saludar);

setTimeout(() => {
    console.log("Buscando materias...");
}, 2000);

setTimeout(() => {
    console.log("Buscando cursos...");
}, 3000);

setTimeout(() => {
    console.log("Buscando Docentes...");
}, 4000);


console.log("Abriendo SGA");
setTimeout(() => {
    console.log("Alumnos Cargados");
}, 3000);

console.log("el usuario puede seguir navegando");

console.log("Solicitando lista de alumnos");
setTimeout(() => {
    console.log("Lista recibida.")
}, 5000);
setTimeout(() => {
    console.log("Mientras tanto el programa sigue ejecutandose...");
}, 400);



function obtenerAlumnos() {
    setTimeout(() => {
        return ["Ana", "José", "Angel"]
    }, 3000);
}


// Este si funciona

function obtenerAlumnos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Ya tengo el arreglo")
            resolve(["Ana", "José", "Angel"]);
        }, 3000);
    })
}

obtenerAlumnos().then((alumnos) => {
    console.log(alumnos);
})

async function iniciar() {
    const alumnos = await obtenerAlumnos();
    console.log(alumnos)
}

iniciar();



function obtenerClima() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("22° C - Soleado")
        }, 2000)
    })
}
// Con then()
obtenerClima().then((clima) => {
    console.log(clima);
})

// Con async/await
async function mostrarClima() {
    const clima = await obtenerClima();
    console.log(clima);
}

mostrarClima();


return new Promise((resolve) => {
    setTimeout(() => {
        resolve(125000);
    }, 3000);
})
 

consultarSaldo().then((saldo) => {
    console.log(saldo);
})

async function obtenerSaldo() {
    const saldo = await consultarSaldo();
    console.log(saldo);
}
obtenerSaldo();


function obtenerUsuario() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                nombre: "Maria",
                edad: 25
            })
        }, 3000);
    })
}

async function mostrarUsuario() {
    console.log("Buscando usuario.....");
    const usuario = await obtenerUsuario();
    console.log(usuario);
}

mostrarUsuario();