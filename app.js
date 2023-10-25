let aBuscarCam = document.getElementById("aBuscarCam");
let nueDoc = document.getElementById("nueDoc");
let nueNom = document.getElementById("nueNom");
let nueTel = document.getElementById("nueTel");
let nueCor = document.getElementById("nueCor");
let nueGru = document.getElementById("nueGru");
let nueCoins = document.getElementById("nueCoins");
let listCampers = document.getElementById("listCampers");
let formularioAñadirCam = document.getElementById("formularioAñadirCam");
let campers = []

/*import { camper } from "./clases.js";*/
/*import { concepto } from "./clases.js";*/

class camper {
    constructor(documento, nombre, telefono, correo, grupo, puntos){
        this.documento = documento;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.grupo = grupo;
        this.puntos = puntos;
    }
    modificar(documento, nombre, telefono, correo, grupo, puntos){
        this.documento = documento;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.grupo = grupo;
        this.puntos = puntos;
    }
    static fromJSON(json) {
        const {documento, nombre, telefono, correo, grupo, puntos} = JSON.parse(json);
        return new cliente(documento, nombre, telefono, correo, grupo, puntos);
    }
}

obtenerCampersGuardados();

function obtenerCampersGuardados() {
    const campersGuardados = localStorage.getItem("campers");
    if (campersGuardados) {
        const campersJSON = JSON.parse(campersGuardados);
        campers = campersJSON.map(json => {
            return new camper(
                json.documento,
                json.nombre,
                json.telefono,
                json.correo,
                json.grupo,
                json.puntos
            );
        });
        listarCam(campers);
    }
}

function listarCam(array){
    while(listCampers.firstChild){
        listCampers.removeChild(listCampers.firstChild);
    }
  
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let camper = document.createElement("li");
        camper.setAttribute("class", "contCamper");
        let enlaceMod = document.createElement("a");
        enlaceMod.setAttribute("href", "#openModalMod");
        let botModificar = document.createElement("button");
        botModificar.setAttribute("onclick", "modificarModal(" + array[i].documento + ")");
        let botEliminar = document.createElement("button");
        botEliminar.setAttribute("onclick", "eliminarCamper(" + array[i].documento + ")");
        let ordenar = document.createElement("div");

        camper.innerHTML = "<strong>Nom:</strong>" + array[i].nombre + "<strong>Doc:</strong>" + array[i].documento+ "<strong>Tel:</strong>" + array[i].telefono+ "<strong>Correo:</strong>" + array[i].correo+ "<strong>Grupo:</strong>" + array[i].grupo;
        botModificar.textContent = "Modificar";
        botEliminar.textContent = "Eliminar";

        ordenar.appendChild(enlaceMod);
        ordenar.appendChild(botEliminar);
        enlaceMod.appendChild(botModificar);
        camper.appendChild(ordenar);
        contenedor.appendChild(camper);
    }
    listCampers.appendChild(contenedor);
}

function buscar(){
    let nuevoArray = [];

    for(let i = 0; i < campers.length; i++){
        if(campers[i].nombre.startsWith(aBuscarCam.value)){
            nuevoArray.push(campers[i]);
        }else if(campers[i].documento.startsWith(aBuscarCam.value)){
            nuevoArray.push(campers[i]);
        }
    }
    listarCam(nuevoArray);
}

function registrarCamper(){
    if((nueDoc.value == "") || (nueNom.value == "") || (nueTel.value == "") || (nueCor.value == "") || (nueGru.value == "") || (nueCoins.value == "")){
        alert("Por favor rellene todos los campos");
        return
    }
    for(let i = 0; i < campers.length; i++){
        if(nueDoc.value == campers[i].documento){
            alert("Numero de documento ya registrado");
            return
        }
        var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(!regex.test(nueCor.value)){
            alert("Ingrese un correo valido");
            return
        }
    }
    let nueCam = new camper(nueDoc.value, nueNom.value, nueTel.value, nueCor.value, nueGru.value, parseInt(nueCoins.value));
    campers.push(nueCam);
    listarCam(campers);
    guardarCampers();
    formularioAñadirCam.reset();
    listarCamAsg(campers);
    listarCampcoins(campers);
}

function modificarModal(documento){
    let existeDiv = document.getElementById("openModalMod");
    if (existeDiv) {
        existeDiv.parentNode.removeChild(existeDiv);
    }
    let div = document.createElement("div");
    for(let i = 0; i < campers.length; i++){
        if( documento == parseInt(campers[i].documento)){
            div.innerHTML = '<div id="openModalMod" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1 class="tituloModal">Modificar camper</h1><hr><form id="formularioModificar"><div class="espForm"><label for="modDoc">Numero de documento: </label><input type="number" id="modDoc" value="'+ campers[i].documento +'"></div><div class="espForm"><label for="modNom">Nombre: </label><input type="text" id="modNom" value="'+ campers[i].nombre +'"></div><div class="espForm"><label for="modTel">Telefono: </label><input type="number" id="modTel" value="'+ campers[i].telefono +'"></div><div class="espForm"><label for="modCor">Correo electronico: </label><input type="email" id="modCor" value="'+ campers[i].correo +'"></div><div class="espForm"><label for="modGru">Grupo: </label><input type="text" id="modGru" value="'+ campers[i].grupo +'"></div><div class="espForm"><label for="modCoins">Campcoins: </label><input type="number" id="modCoins" value="'+ campers[i].puntos +'"></div></form><a><button id="botModificarCam" onclick="modificarCamper('+ documento +')">Enviar</button></a></div></div>';
        }
    }
    listCampers.appendChild(div);
    listarCamAsg(campers);
    listarCampcoins(campers);
}

function modificarCamper(documento){
    let modDoc = document.getElementById("modDoc");
    let modNom = document.getElementById("modNom");
    let modTel = document.getElementById("modTel");
    let modCor = document.getElementById("modCor");
    let modGru = document.getElementById("modGru");
    let modCoins = document.getElementById("modCoins");


    for(let i = 0; i < campers.length; i++){
        if(modDoc.value == campers[i].documento && campers[i].documento != documento){
            alert("Numero de documento ya registrado");
            return
        }
    }
    var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!regex.test(modCor.value)){
        alert("Ingrese un correo valido");
        return
    }
    for(let i = 0; i < campers.length; i++){
        if(documento == campers[i].documento){
            documento = modDoc.value;
            campers[i].modificar(modDoc.value, modNom.value, modTel.value, modCor.value, modGru.value, modCoins.value);
            
        }
    }
    listarCam(campers);
    guardarCampers();
    listarCamAsg(campers);
    listarCampcoins(campers);
}

function eliminarCamper(documento){
    for(let i = 0; i < campers.length; i++){
        if(documento == campers[i].documento){
            campers.splice(i, 1);
        }
    }
    listarCam(campers);
    guardarCampers();
    listarCamAsg(campers);
    listarCampcoins(campers);
}

function guardarCampers() {
    const campersJSON = campers.map(cliente => ({
        documento: cliente.documento,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono,
        correo: cliente.correo,
        grupo: cliente.grupo,
        puntos: cliente.puntos
    }));
    localStorage.setItem("campers", JSON.stringify(campersJSON));
}

aBuscarCam.addEventListener("input", buscar);
document.addEventListener("DOMContentLoaded", guardarCampers);

let aBuscarCon = document.getElementById("aBuscarCon");
let selectOrdCon = document.getElementById("selectOrdCon");
let nueID = document.getElementById("nueID");
let nueDes = document.getElementById("nueDes");
let nueVal = document.getElementById("nueVal");
let listConceptos = document.getElementById("listConceptos");
let formularioAñadirCon = document.getElementById("formularioAñadirCon");
let conceptos = [];

class concepto {
    constructor(id, descripcion, valor){
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
    }
}


obtenerConceptosGuardados();

function obtenerConceptosGuardados() {
    const conceptosGuardados = localStorage.getItem("conceptos");
    if (conceptosGuardados) {
        conceptos = JSON.parse(conceptosGuardados);
        listarVid(conceptos);
    }
}

function listarVid(array){

    while(listConceptos.firstChild){
        listConceptos.removeChild(listConceptos.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let concepto = document.createElement("li");
        let enlaceVer = document.createElement("a");
        concepto.setAttribute("class", "contConcepto");
        enlaceVer.setAttribute("href", "#openModalVer");
        let botVer = document.createElement("button");
        botVer.setAttribute("onclick", "verModal(" + array[i].id + ")");
        let botEliminar = document.createElement("button");
        botEliminar.setAttribute("onclick", "eliminarConcepto(" + array[i].id + ")");
        let cont = document.createElement("div");

        concepto.innerHTML = "<strong>ID: " + array[i].id + "</strong><strong>Descripción: " + array[i].descripcion + "</strong><strong class = 'resaltar'>Valor: " + array[i].valor + "</strong>";
        botVer.textContent = "Ver mas";
        botEliminar.textContent = "Eliminar";
        
        enlaceVer.appendChild(botVer);
        cont.appendChild(enlaceVer);
        cont.appendChild(botEliminar);
        concepto.appendChild(cont);
        contenedor.appendChild(concepto);
    }
    listConceptos.appendChild(contenedor);
}

function buscar(){
    let nuevoArray = [];

    for(let i = 0; i < conceptos.length; i++){
        if(conceptos[i].descripcion.startsWith(aBuscarCon.value)){
            nuevoArray.push(conceptos[i]);
        }
    }
    listarVid(nuevoArray);
}

function registrarConcepto(){
    if((nueID.value == "") || (nueDes.value == "") || (nueVal.value == "")){
        alert("Por favor rellene todos los campos");
        return
    }
    for(let i = 0; i < conceptos.length; i++){
        if(nueID.value == conceptos[i].id){
            alert("ID ya registrado");
            return
        }
    }
    let nueCon = new concepto(nueID.value, nueDes.value, nueVal.value);
    conceptos.push(nueCon);
    listarVid(conceptos);
    guardarConceptos();
    formularioAñadirCon.reset();
    listarConAsg(conceptos);
}

function verModal(id){
    let existeDiv = document.getElementById("openModalVer");
    if (existeDiv) {
        existeDiv.parentNode.removeChild(existeDiv);
    }
    let div = document.createElement("div");
    for(let i = 0; i < conceptos.length; i++){
        if(id == parseInt(conceptos[i].id)){
            div.innerHTML = '<div id="openModalVer" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1 class="tituloModal">ID: ' + conceptos[i].id +'</h1><hr><h2 class="contModal"><strong>Descripción: </strong>'+ conceptos[i].descripcion +'</h2><h2 class="contModal"><strong>Valor en campcoins: </strong>'+ conceptos[i].valor +'</h2></div></div>';
        }
    }
    listConceptos.appendChild(div);
}

function eliminarConcepto(id){
    for(let i = 0; i < conceptos.length; i++){
        if(id == conceptos[i].id){
            conceptos.splice(i, 1);
        }
    }
    listarVid(conceptos);
    guardarConceptos();
    listarConAsg(conceptos);
}


function guardarConceptos() {
    localStorage.setItem("conceptos", JSON.stringify(conceptos));
}

aBuscarCon.addEventListener("input", buscar);
document.addEventListener("DOMContentLoaded", guardarConceptos);

let listCampersAsg = document.getElementById("listCampersAsg");
let listConceptosAsg = document.getElementById("listConceptosAsg");
let modalCompletado = document.getElementById("modalCompletado");
let botonAsignar = document.getElementById("botonAsignar");

listarCamAsg(campers);
listarConAsg(conceptos);

function listarCamAsg(array){
    while(listCampersAsg.firstChild){
        listCampersAsg.removeChild(listCampersAsg.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let camper = document.createElement("li"); 
        camper.setAttribute("class", "contCamperAsg");
        let radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "camper");
        radio.setAttribute("id", array[i].documento);
        radio.setAttribute("value", array[i].documento);

        camper.innerHTML = "<strong>" + array[i].nombre + "</strong>" + array[i].documento;
        
        camper.appendChild(radio);
        contenedor.appendChild(camper);

    }
    listCampersAsg.appendChild(contenedor);
}

function listarConAsg(array){
    while(listConceptosAsg.firstChild){
        listConceptosAsg.removeChild(listConceptosAsg.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let concepto = document.createElement("li");
        concepto.setAttribute("class", "contConceptoAsg");
        let radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "concepto");
        radio.setAttribute("id", array[i].id);
        radio.setAttribute("value", array[i].id);

        concepto.innerHTML = "<strong>" + array[i].id + "</strong>" + "<strong>" + array[i].descripcion + "</strong>" + "<strong>" + array[i].valor + "</strong>";

        concepto.appendChild(radio);
        contenedor.appendChild(concepto);
    }
    listConceptosAsg.appendChild(contenedor);
}

function asignar(){
    let valor = 0;
    let nombre = "";
    let puntos = 0;
    let encontradoCam = false;
    let encontradoCon = false;

    for(let i = 0; i < campers.length; i++){
        let camperAsg = document.getElementById(campers[i].documento);
        if (camperAsg.checked){
            encontradoCam = true;
        }
    }
    for(let i = 0; i < conceptos.length; i++){
        let conceptoAsg = document.getElementById(conceptos[i].id);
        if(conceptoAsg.checked){
            encontradoCon = true;
        }
    }
    if(encontradoCam == false){
        alert("Seleccione un camper");
        return
    }
    if(encontradoCon == false){
        alert("Seleccione un concepto");
        return
    }
    for(let i = 0; i < conceptos.length; i++){
        let conceptoAsg = document.getElementById(conceptos[i].id);
        if(conceptoAsg.checked){
            nombre = conceptos[i].nombre;
            valor = conceptos[i].valor;
        }
    }
    for(let i = 0; i < campers.length; i++){
        let camperAsg = document.getElementById(campers[i].documento);
        if (camperAsg.checked){
            nomCam = campers[i].nombre;
            campers[i].puntos = campers[i].puntos + parseInt(valor);
            guardarCampersAsg();
        }
    }
    let existeDiv = document.getElementById("openModalCompletado");
    if (existeDiv) {
        existeDiv.parentNode.removeChild(existeDiv);
    }
    let div = document.createElement("div");
    div.innerHTML = '<div id="openModalCompletado" class="modalDialog"><div><a href="#close" title="Close" class="close">X</a><h1>Asignación completada</h1></div></div>';
    modalCompletado.appendChild(div);
}

function guardarCampersAsg() {
    const clientesJSON = campers.map(camper => ({
        documento: camper.documento,
        nombre: camper.nombre,
        telefono: camper.telefono,
        correo: camper.correo,
        grupo: camper.grupo,
        puntos: camper.puntos
    }));
    localStorage.setItem("campers", JSON.stringify(clientesJSON));
    listarCam(campers);
    listarCampcoins(campers);
}

botonAsignar.addEventListener("click", asignar);

let listaCampcoins = document.getElementById("listaCampcoins");

function listarCampcoins(array){
    while(listaCampcoins.firstChild){
        listaCampcoins.removeChild(listaCampcoins.firstChild);
    }
    let contenedor = document.createElement("div");
    for(let i = 0; i < array.length; i++){
        let camper = document.createElement("li");
        camper.setAttribute("class", "contCampcoins"); 

        camper.innerHTML = "<strong>" + array[i].nombre + "</strong><strong class = 'resaltar'>Puntos: " + array[i].puntos + "</strong>";
        
        contenedor.appendChild(camper);

    }
    listaCampcoins.appendChild(contenedor);
}

listarCampcoins(campers);
