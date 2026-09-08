const validarNombre = (nombre) => {
  if (!nombre) return false;
  let nombreValido = nombre.trim().length >= 3;
  return nombreValido;
};

const validarTipo = (tipo) => {
    if (!tipo) return false;
    return true;
};

const validarLugar = (lugar) => {
  if (!lugar) return false;
  let lugarValido = lugar.trim().length >= 3;
  return lugarValido;
};

const validarHora = (hora) => {
    if (!hora) return false;
    return true;
};

const validarFecha = (fecha) => {
    if (!fecha) return false;
    let fechaDada = new Date(fecha);
    let fechaActual = new Date();
    let fechaMinima = new Date();
    fechaMinima.setFullYear(fechaActual.getFullYear() - 1);
    return fechaDada <= fechaActual && fechaDada >= fechaMinima;
};

const validarArchivo = (archivo) => {
    if (!archivo) return false;
    let archivos = archivo.files;
    return archivos.length > 0;
};

const validarForm = () => {
    let nombre = document.getElementById("nombre").value;
    let tipo = document.getElementById("select-tipo").value;
    let lugar = document.getElementById("lugar").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let archivo = document.getElementById("archivo");

    let nombreValido = validarNombre(nombre);
    let tipoValido = validarTipo(tipo);
    let lugarValido = validarLugar(lugar);
    let fechaValida = validarFecha(fecha);
    let horaValida = validarHora(hora);
    let archivoValido = validarArchivo(archivo);

    let errorNombre = document.getElementById("error-nombre");
    let errorTipo = document.getElementById("error-tipo");
    let errorLugar = document.getElementById("error-lugar");
    let errorFecha = document.getElementById("error-fecha");
    let errorHora = document.getElementById("error-hora");
    let errorArchivo = document.getElementById("error-archivo");

    if (!nombreValido) {
        errorNombre.classList.add("visible");
    } else {
        errorNombre.classList.remove("visible");
    }

    if (!tipoValido) {
        errorTipo.classList.add("visible");
    } else {
        errorTipo.classList.remove("visible");
    }

    if (!lugarValido) {
        errorLugar.classList.add("visible");
    } else {
        errorLugar.classList.remove("visible");
    }

    if (!fechaValida) {
        errorFecha.classList.add("visible");
    } else {
        errorFecha.classList.remove("visible");
    }

    if (!horaValida) {
        errorHora.classList.add("visible");
    } else {
        errorHora.classList.remove("visible");
    }

    if (!archivoValido) {
        errorArchivo.classList.add("visible");
    } else {
        errorArchivo.classList.remove("visible");
    }

    return nombreValido &&
           tipoValido &&
           lugarValido &&
           fechaValida &&
           horaValida &&
           archivoValido;
};


let form = document.getElementById("formulario-informe");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validarForm()) {
        alert("Avistamiento informado correctamente");
    }
});