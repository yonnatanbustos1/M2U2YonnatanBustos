var listaNumeros = []

async function validarCampo(campo) {
    if (campo == null || campo == undefined || campo == '') {
        return false
    }
    if (campo <= 0) {
        return false
    }
    return true
}

async function validarNumerosDiferentes() {
    if (listaNumeros.length > 0) {
        var lista = [...new Set(listaNumeros)]

        if (lista.length === listaNumeros.length) {
            return true
        }
    }
    return false

}

async function calcularMenorMayor() {
    listaNumeros = []
    limpiarResultado()
    const numero1 = document.getElementById('numero1').value
    const numero2 = document.getElementById('numero2').value
    const numero3 = document.getElementById('numero3').value
    const numero4 = document.getElementById('numero4').value

    const isValid = await validarCampo(numero1) && await validarCampo(numero2) && await validarCampo(numero3) && await validarCampo(numero4)
    if (!isValid) {
        crearAlerta('Todos los números deben ser mayores a cero', 'warning')
        return
    }

    listaNumeros.push(+numero1)
    listaNumeros.push(+numero2)
    listaNumeros.push(+numero3)
    listaNumeros.push(+numero4)

    const numerosRepetidos = await validarNumerosDiferentes()
    if (!numerosRepetidos) {
        crearAlerta('Todos los números deben ser diferentes', 'warning')
        return
    }

    listaNumeros.sort(function (a, b) {
        return a - b
    })

    document.getElementById('numeroMenor').innerHTML = `El número menor es: ${listaNumeros[0]}`
    document.getElementById('numeroMayor').innerHTML = `El número mayor es: ${listaNumeros[listaNumeros.length - 1]}`
}




function crearAlerta(message, type) {
    cerrarAlerta()
    const mensajeAdvertencia = document.getElementById('mensajeAdvertencia')
    const alert = document.getElementById('alert')
    alert.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert" id="mensajeAdvertencia">' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="cerrarAlerta()"><span aria-hidden="true">&times;</span></button></div>'
}


function cerrarAlerta(){
    const mensajeAdvertencia = document.getElementById('mensajeAdvertencia')
    if(mensajeAdvertencia){
        mensajeAdvertencia.remove()
    }    
}

function limpiarResultado(){
    document.getElementById('numeroMenor').innerHTML = ''
    document.getElementById('numeroMayor').innerHTML = ''
}

var btnCalcular = document.querySelector('#calcular')
btnCalcular.addEventListener('click', calcularMenorMayor)