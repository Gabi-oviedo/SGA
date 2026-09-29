const API_DOCENTES = "http://localhost:3000/docentes";

const formulario = document.querySelector("#formulario");
const listaDocentes = document.querySelector("#listaDocentes");
const btnCancelar = document.querySelector("#btnCancelar");

let docenteEditandoId = null;
let docenteOriginal = null;

cargarDocentes();


// Guardar docente
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const especialidad = document.querySelector("#especialidad").value.trim();
    const correo = document.querySelector("#correo").value.trim();

    // Validar campos
    if (nombre === "" || especialidad === "" || correo === "") {
        mostrarMensaje(
            "Todos los campos son obligatorios.",
            "mje-adv"
        );
        return;
    }

    const datosDocente = {
        nombre,
        especialidad,
        correo
    };

    // Si estamos editando, comprobar si hubo cambios
    if (docenteEditandoId !== null) {
        const sinCambios =
            datosDocente.nombre === docenteOriginal.nombre &&
            datosDocente.especialidad === docenteOriginal.especialidad &&
            datosDocente.correo === docenteOriginal.correo;

        if (sinCambios) {
            mostrarMensaje(
                "No se realizaron cambios en el docente.",
                "mje-adv"
            );
            return;
        }
    }

    try {
        // Crear
        if (docenteEditandoId === null) {

            await crearDocente(datosDocente);

            mostrarMensaje(
                "Docente creado correctamente.",
                "mje-exito"
            );

        // Actualizar
        } else {

            await actualizarDocente(
                docenteEditandoId,
                datosDocente
            );

            mostrarMensaje(
                "Docente actualizado correctamente.",
                "mje-exito"
            );

            docenteEditandoId = null;
            docenteOriginal = null;
        }

        formulario.reset();

        await cargarDocentes();

    } catch (error) {
        console.error(error);

        mostrarMensaje(
            "Error al guardar el docente.",
            "mje-error"
        );
    }
});


// Cancelar
btnCancelar.addEventListener("click", () => {
    formulario.reset();

    docenteEditandoId = null;
    docenteOriginal = null;
});


// Obtener docentes
async function cargarDocentes() {
    try {
        const respuesta = await fetch(API_DOCENTES);

        if (!respuesta.ok) {
            throw new Error("Error al obtener los docentes.");
        }

        const docentes = await respuesta.json();

        mostrarDocentes(docentes);

    } catch (error) {
        console.error(error);

        mostrarMensaje(
            "No se pudieron cargar los docentes.",
            "mje-error"
        );
    }
}


// Crear docente
async function crearDocente(datosDocente) {
    const respuesta = await fetch(API_DOCENTES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosDocente)
    });

    if (!respuesta.ok) {
        throw new Error("Error al crear el docente.");
    }

    return await respuesta.json();
}


// Actualizar docente
async function actualizarDocente(id, datosDocente) {
    const respuesta = await fetch(
        `${API_DOCENTES}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosDocente)
        }
    );

    if (!respuesta.ok) {
        throw new Error("Error al actualizar el docente.");
    }

    return await respuesta.json();
}


// Eliminar docente
async function eliminarDocente(id) {
    try {
        const respuesta = await fetch(
            `${API_DOCENTES}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!respuesta.ok) {
            throw new Error("Error al eliminar el docente.");
        }

        await cargarDocentes();

        mostrarMensaje(
            "Docente eliminado correctamente.",
            "mje-exito"
        );

    } catch (error) {
        console.error(error);

        mostrarMensaje(
            "Error al eliminar el docente.",
            "mje-error"
        );
    }
}


// Mostrar docentes
function mostrarDocentes(docentes) {
    listaDocentes.innerHTML = "";

    docentes.forEach((docente) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${docente._id}</td>
            <td>${docente.nombre}</td>
            <td>${docente.especialidad}</td>
            <td>${docente.correo}</td>
            <td>
                <button
                    type="button"
                    class="btn-editar"
                    data-id="${docente._id}">
                    Editar
                </button>

                <button
                    type="button"
                    class="btn-eliminar"
                    data-id="${docente._id}">
                    Eliminar
                </button>
            </td>
        `;

        listaDocentes.appendChild(fila);
    });

    agregarEventosBotones();
}


// Eventos de botones
function agregarEventosBotones() {

    document.querySelectorAll(".btn-editar").forEach((boton) => {

        boton.addEventListener("click", () => {
            editarDocente(boton.dataset.id);
        });

    });

    document.querySelectorAll(".btn-eliminar").forEach((boton) => {

        boton.addEventListener("click", () => {
            eliminarDocente(boton.dataset.id);
        });

    });
}


// Editar docente
async function editarDocente(id) {
    try {
        const respuesta = await fetch(
            `${API_DOCENTES}/${id}`
        );

        if (!respuesta.ok) {
            throw new Error("Docente no encontrado.");
        }

        const docente = await respuesta.json();

        // Cargar datos en el formulario
        document.querySelector("#nombre").value =
            docente.nombre;

        document.querySelector("#especialidad").value =
            docente.especialidad;

        document.querySelector("#correo").value =
            docente.correo;

        // Guardar ID del docente que estamos editando
        docenteEditandoId = docente._id;

        // Guardar copia de los datos originales
        docenteOriginal = {
            nombre: docente.nombre,
            especialidad: docente.especialidad,
            correo: docente.correo
        };

    } catch (error) {
        console.error(error);

        mostrarMensaje(
            "No se pudo cargar el docente.",
            "mje-error"
        );
    }
}
