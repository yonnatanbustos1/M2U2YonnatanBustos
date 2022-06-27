class Asignatura {
    constructor(nombreAsignatura, valorAsignatura) {
        this.nombreAsignatura = nombreAsignatura
        this.valorAsignatura = valorAsignatura
    }
}

const listaAsignaturas = []
const VALOR_PAPELERIA = 20000
const VALOR_CARNET = 8000
const DESCUENTO = 0.2


async function agregarAsignatura(){
    const nombreAsignatura = document.getElementById('nombreAsignatura').value
    const valorAsignatura = +document.getElementById('valorAsignatura').value

    var esCamposValidos = await validarCampo(nombreAsignatura) && await validarCampo(valorAsignatura)

    if (esCamposValidos) {
        listaAsignaturas.push(new Asignatura(nombreAsignatura, valorAsignatura))
        await limpiarFormularioAsignatura()
        await addFilaAsignatura(nombreAsignatura, valorAsignatura)
    }
}

function validarCampo(campo){

    if (campo == null || campo == undefined) {
        return false
    }
    if (typeof campo === 'string' && campo == '') {
        return false
    }
    if (typeof campo === 'number' && campo <= 0) {
        crearAlerta('El valor de la asignatura debe ser mayor a cero', 'warning')
        return false
    }
    return true
}

function crearAlerta(message, type) {
    const mensajeAdvertencia = document.getElementById('mensajeAdvertencia')
    if(mensajeAdvertencia){
        mensajeAdvertencia.hidden = false
        return
    }
    const alert = document.getElementById('alert')
    alert.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert" id="mensajeAdvertencia">' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="cerrarAlerta()"><span aria-hidden="true">&times;</span></button></div>'
}


function cerrarAlerta(){
    const mensajeAdvertencia = document.getElementById('mensajeAdvertencia')
    if(mensajeAdvertencia){
        mensajeAdvertencia.hidden = true
        return
    }
    
}

async function limpiarFormularioAsignatura(){
    document.getElementById('nombreAsignatura').value = ''
    document.getElementById('valorAsignatura').value = ''
}


async function calcularCostoTotal(){
    const nombreEstudiante = document.getElementById('nombreEstudiante').value
    isValid = await validarCampo(nombreEstudiante)

    if(isValid && listaAsignaturas.length > 0){
        var costo = 0
        listaAsignaturas.forEach(asignatura =>{
            costo += asignatura.valorAsignatura
        })

        var descuento = costo * DESCUENTO
        costo -= descuento
        costo += VALOR_PAPELERIA + VALOR_CARNET
        var costoTotal = document.getElementById('costoTotal')
        costoTotal.innerHTML = '$ ' + costo
    }
}


function addFilaAsignatura(nombreAsignatura, valorAsignatura){
    var table = document.getElementById('tablaAsignatura')
    var fila = table.insertRow()

    var celda = fila.insertCell()
    celda.innerHTML = listaAsignaturas.length
    celda = fila.insertCell()
    celda.innerHTML = nombreAsignatura
    celda = fila.insertCell()
    celda.innerHTML = '$ ' + valorAsignatura
}




var btnAgregar = document.querySelector('#agregarAsignatura');
btnAgregar.addEventListener('click', agregarAsignatura)

var btnCalcularCosto = document.querySelector('#calcularCosto')
btnCalcularCosto.addEventListener('click', calcularCostoTotal)

