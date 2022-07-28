"use strict";
// ARREGLO
let arregloTareas = [
    { id: 1, descripcion: "Hacer mercado", estado: false },
    { id: 2, descripcion: "Estudiar para la prueba de programacion", estado: false },
    { id: 3, descripcion: "Sacar a pasear a Bolt", estado: false }]
// SELECTORES
let boxInput = document.querySelector("#input-tarea");
let boxButton = document.querySelector("#btn-add");
let inyecionHtml = document.querySelector("#jobs");
let inyecionBtns = document.querySelector("#actions");
let boxTotalTareas = document.querySelector("#idTotalTareas");
let boxTotalRealizadas = document.querySelector("#idTotalRealizadas");
// HTML VARIABLES DE INYECCION DIVS TOTALES
let correlativo = 4;
let html2 = "";
let html = "";
window.onload = function () { // FUNCION PARA CUANDO EL HTML ESTE CARGADO EJECUTAR LOS SCRIPTS
    cargarArreglos();
    agregarEventoClickCheckbox();
    agregarEventoClickButton();
    contarTareas();
}

function cargarArreglos() { // FUNCION DE CARGA INICIAL DE NUESTRO PROGRAMA
    html2 = "";
    html = "";
    for (const tarea of arregloTareas) {
        template(tarea.id, tarea.descripcion, tarea.estado);
    }
    inyecionHtml.innerHTML = html;
    inyecionBtns.innerHTML = html2;
    contarTareas();
}

function template(id, descripcion, estado) { // FUNCION TEMPLATE INYECTA EL ARREGLO EN NUESTRO HTML

    if (estado === true) {
        html += `<div class="job" id="job-${id}"> <p>${id}</p> <p style="text-decoration: line-through; color: red;" id="descripcion-${id}">${descripcion}</p></div>`;
        html2 += `<div class="action" id="action-${id}">
                <input type="checkbox" class="checkbox" id="check-${id}" checked="true">
                <button class="btn-delete" id="btn-delete-${id}" type="button"> X </button>
                </div>`;
    } else {
        html += `<div class="job" id="job-${id}"> <p>${id}</p> <p id="descripcion-${id}">${descripcion}</p></div>`;
        html2 += `<div class="action" id="action-${id}">
                <input type="checkbox" class="checkbox" id="check-${id}">
                <button class="btn-delete" id="btn-delete-${id}" type="button"> X </button>
                </div>`;
    }
    contarTareas();
}

function agregar(detalleTarea) { // FUNCION AGREGAR TAREA DENTRO DE NUESTRO ARREGLO
    if (detalleTarea === null || detalleTarea === undefined || detalleTarea === "") {
        alert("Debe ingresar el nombre de la tarea");
        return;
    }
    else {
        arregloTareas.push({ id: correlativo, descripcion: detalleTarea, estado: false })
        correlativo++;
    }
    cargarArreglos();
    contarTareas();
}

function contarTareas() { // FUNCION PARA CONTAR LAS TAREAS
    const totalTareas = arregloTareas.length;
    const totalTareasRealizadas = arregloTareas.filter(arreglo => arreglo.estado === true)
    boxTotalTareas.innerHTML = totalTareas;
    boxTotalRealizadas.innerHTML = totalTareasRealizadas.length;
}

boxButton.addEventListener("click", () => { // EVENTO CLICK SOBRE NUESTRO BUTTON AGREGAR
    agregar(boxInput.value);
    agregarEventoClickCheckbox();
    agregarEventoClickButton();
    document.querySelector("#input-tarea").value = "";
});

function cambioCheck(idCapturado) { // EVENTO CLICK SOBRE NUESTRO CHECKBOX
    const index = arregloTareas.findIndex((elemento) => Number(elemento.id) === Number(idCapturado));
    let pasoId = arregloTareas[index].id;
    let pasoDescripcion = arregloTareas[index].descripcion;
    if (arregloTareas[index].estado === false) {
        arregloTareas.splice(index, 1, { id: pasoId, descripcion: pasoDescripcion, estado: true });
        document.getElementById(`descripcion-${pasoId}`).style.textDecoration = "line-through";
        document.getElementById(`descripcion-${pasoId}`).style.color = "red";
    } else {
        arregloTareas.splice(index, 1, { id: pasoId, descripcion: pasoDescripcion, estado: false });
        document.getElementById(`descripcion-${pasoId}`).style.textDecoration = "none";
        document.getElementById(`descripcion-${pasoId}`).style.color = "white";
    }
    contarTareas();
}

function agregarEventoClickCheckbox() { // EVENTO CLICK SOBRE CHECKBOX PARA OBTENER LA ID
    const checkCapturadoS = Array.from(document.querySelectorAll(".checkbox"));// ARRAY FROM PARA TRANSFORMAR NODELIST A ARRAY
    for (let checkCaptura of checkCapturadoS) {
        const capturado = `#${checkCaptura.id}`;
        let idBusqueda = capturado.match(/\d+/g).join(''); // SEPARAMOS LETRAS DEL ID CON EL FIN DE PASARLO PARA EL FIND_INDEX
        const boxCheck = document.querySelector(capturado);
        boxCheck.addEventListener("click", () => { cambioCheck(idBusqueda) })
    }
}

function eliminarTarea(idCapturado) { // EVENTO CLICK SOBRE NUESTRO BUTTON DELETE
    const index = arregloTareas.findIndex((elemento) => Number(elemento.id) === Number(idCapturado));
    arregloTareas.splice(index, 1);
    cargarArreglos();
    agregarEventoClickButton();
    agregarEventoClickCheckbox();
    contarTareas();
}

function agregarEventoClickButton() { // EVENTO CLICK SOBRE BUTTON PARA OBTENER LA ID
    const btnCapturadoS = Array.from(document.querySelectorAll(".btn-delete")); // ARRAY FROM PARA TRANSFORMAR NODELIST A ARRAY
    for (let btnCaptura of btnCapturadoS) {
        const capturado = `#${btnCaptura.id}`;
        let idBusqueda = capturado.match(/\d+/g).join(''); // SEPARAMOS LETRAS DEL ID CON EL FIN DE PASARLO PARA EL FIND_INDEX
        const boxBtn = document.querySelector(capturado);
        boxBtn.addEventListener("click", () => { eliminarTarea(idBusqueda) })
    }
    
}