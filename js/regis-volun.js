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


let form = document.getElementById("formulario-registro");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validarForm()) {
        alert("Voluntario registrado correctamente");
    }
});


const data = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara", "Camiña", "Colchane"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama", "Taltal", "María Elena"],
    "Atacama": ["Copiapó", "Vallenar", "Caldera", "Chañaral", "Tierra Amarilla", "Diego de Almagro", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña", "Los Vilos", "Salamanca"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Quillota", "Los Andes"],
    "Metropolitana": ["Santiago", "Puente Alto", "Maipú", "La Florida", "Las Condes", "San Bernardo", "Paine"],
    "Region Bernardo O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Machalí", "Santa Cruz", "San Vicente", "Pichilemu"],
    "Maule": ["Talca", "Curicó", "Linares", "Constitución", "Cauquenes", "Molina", "San Javier"],
    "Ñuble": ["Chillán", "San Carlos", "Chillán Viejo", "Bulnes", "Coihueco", "Quillón", "Yungay"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "San Pedro de la Paz", "Chiguayante", "Lota"],
    "La Araucanía": ["Temuco", "Villarrica", "Angol", "Pitrufquén", "Pucón", "Victoria", "Lautaro"],
    "Los Ríos": ["Valdivia", "La Unión", "Panguipulli", "Río Bueno", "Paillaco", "Los Lagos", "Lanco"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Puerto Varas", "Ancud", "Quellón", "Calbuco"],
    "Aysén": ["Coyhaique", "Aysén", "Chile Chico", "Cochrane", "Cisnes", "Río Ibáñez", "Lago Verde"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Natales", "Porvenir", "Cabo de Hornos", "Torres del Paine", "San Gregorio", "Río Verde"]
};


const regiones = () => {
    let regionSelect = document.getElementById("select-reg");

    for (const region in data) {
        let option = document.createElement("option");

        option.value = region;
        option.text = region;

        regionSelect.appendChild(option);
    }
};

const comunas = () => {
    let regionSelect = document.getElementById("select-reg");
    let comunaSelect = document.getElementById("select-com");

    let regionSeleccionada = regionSelect.value;

    comunaSelect.replaceChildren();

    if (data[regionSeleccionada]) {
        comunaSelect.disabled = false;

        data[regionSeleccionada].forEach(comuna => {
            let option = document.createElement("option");

            option.value = comuna;
            option.text = comuna;

            comunaSelect.appendChild(option);
        });

    } else {
        comunaSelect.disabled = true;

        let option = document.createElement("option");
        option.value = "";
        option.text = "Seleccione una comuna";

        comunaSelect.appendChild(option);
    }
};

document
    .getElementById("select-reg")
    .addEventListener("change", comunas);

window.onload = () => {
    regiones();
};

