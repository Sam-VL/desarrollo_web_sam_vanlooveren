const validarNombre = (nombre) => {
  if (!nombre) return false;
  let nombreValido = nombre.trim().length >= 3;
  return nombreValido;
};

const validarEmail = (email) => {
    if (!email) return false;
    let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return emailValido;
};

const validarTelefono = (telefono) => {
    if (!telefono) return false;
    let telefonoValido = /^[0-9]{9}$/.test(telefono);
    return telefonoValido;
};

const validarRegion = (region) => {
    if (!region) return false;
    return true;
};


const validarComuna = (comuna) => {
    if (!comuna) return false;
    return true;
};

const validarForm = () => {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let region = document.getElementById("select-reg").value;
    let comuna = document.getElementById("select-com").value;

    let nombreValido = validarNombre(nombre);
    let emailValido = validarEmail(email);
    let telefonoValido = validarTelefono(telefono);
    let regionValida = validarRegion(region);
    let comunaValida = validarComuna(comuna);

    let errorNombre = document.getElementById("error-nombre");
    let errorEmail = document.getElementById("error-email");
    let errorTelefono = document.getElementById("error-telefono");
    let errorRegion = document.getElementById("error-region");
    let errorComuna = document.getElementById("error-comuna");

    if (!nombreValido) {
        errorNombre.classList.add("visible");
    } else {
        errorNombre.classList.remove("visible");
    }

    if (!emailValido) {
        errorEmail.classList.add("visible");
    } else {
        errorEmail.classList.remove("visible");
    }

    if (!telefonoValido) {
        errorTelefono.classList.add("visible");
    } else {
        errorTelefono.classList.remove("visible");
    }

    if (!regionValida) {
        errorRegion.classList.add("visible");
    } else {
        errorRegion.classList.remove("visible");
    }

    if (!comunaValida) {
        errorComuna.classList.add("visible");
    } else {
        errorComuna.classList.remove("visible");
    }

    return nombreValido &&
           emailValido &&
           telefonoValido &&
           regionValida &&
           comunaValida;
};

const cargarComunas = () => {
    let selectComuna = document.getElementById("select-com");
    let selectRegion = document.getElementById("select-reg");
    let regionId = selectRegion.value;

    selectComuna.replaceChildren();

    if (!regionId) {
        selectComuna.disabled = true;

        let option = document.createElement("option");
        option.value = "";
        option.text = "Seleccione una comuna";
        selectComuna.appendChild(option);

        return;
    }

    fetch(`/comunas/${regionId}`)
        .then(response => response.json())
        .then(data => {
            selectComuna.disabled = false;

            let optionInicial = document.createElement("option");
            optionInicial.value = "";
            optionInicial.text = "Seleccione una comuna";
            selectComuna.appendChild(optionInicial);
            
            data.forEach(comuna => {
                let option = document.createElement("option");
                option.value = comuna.id;
                option.text = comuna.nombre;
                selectComuna.appendChild(option);
            });
        });
};

document.getElementById("select-reg").addEventListener("change", cargarComunas);

let form = document.getElementById("formulario-registro");

form.addEventListener("submit", function(event) {
    if (!validarForm()) {
        event.preventDefault();
    }
});


