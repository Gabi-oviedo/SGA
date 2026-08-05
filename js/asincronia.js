console.log("Inicio");

setTimeout(() => {
    console.log("Buscando Alumnos...");
}, 3000);
console.log("Fin");

function saludar(){
    console.log("Hola");
}

function ejectuar(funcion){
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