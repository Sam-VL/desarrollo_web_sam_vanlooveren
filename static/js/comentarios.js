let listaComentarios = document.getElementById("lista-comentarios");
let avistamientoId = listaComentarios.dataset.avistamientoId;

const mostrarComentarios = (comentarios) => {
    listaComentarios.replaceChildren();

    if (comentarios.length == 0) {
        let mensaje = document.createElement("p");
        mensaje.innerText = "No hay comentarios";
        listaComentarios.appendChild(mensaje);
        return;
    }

    for (let comentario of comentarios) {
        let contenedor = document.createElement("div");
        let fecha = document.createElement("div");
        fecha.innerText = comentario.fecha;
        let nombre = document.createElement("div");
        nombre.innerText = comentario.nombre;
        let texto = document.createElement("div");
        texto.innerText = comentario.texto;

        contenedor.append(fecha, nombre, texto);
        listaComentarios.appendChild(contenedor);
    }
};

const cargarComentarios = () => {
    fetch(`/comentarios/${avistamientoId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al obtener los comentarios");
            }
            return response.json();
        })
        .then((comentarios) => {
            mostrarComentarios(comentarios);
        })
        .catch((error) => {
            console.error("Error:", error);
            listaComentarios.innerText = "No se pudieron cargar los comentarios";
        });
};

cargarComentarios();

let btnAgregarComentario = document.getElementById("boton-agregar-comentario");

const agregarComentario = () => {
    let nombre = document.getElementById("nombre-comentario").value.trim();
    let texto = document.getElementById("texto-comentario").value.trim();
    
    let errorNombre = document.getElementById("error-nombre-comentario");
    let errorTexto = document.getElementById("error-texto-comentario");

    let nombreValido = nombre.length >= 3 && nombre.length <= 50;
    let textoValido = texto.length >= 5 && texto.length <= 300;

    let errorEnvio = document.getElementById("error-envio-comentario");
    errorEnvio.classList.remove("visible");

    if (!nombreValido) {
        errorNombre.classList.add("visible");
    } else {
        errorNombre.classList.remove("visible");
    }

    if (!textoValido) {
        errorTexto.classList.add("visible");
    } else {
        errorTexto.classList.remove("visible");
    }

    if (!nombreValido || !textoValido) {
        return;
    }

    fetch(`/comentarios/${avistamientoId}`, {
        method: "POST",
        body: JSON.stringify({
            nombre: nombre,
            texto: texto
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al guardar el comentario");
            }
            return response.json();
        })
        .then(() => {
            document.getElementById("nombre-comentario").value = "";
            document.getElementById("texto-comentario").value = "";
            cargarComentarios();
        })
        .catch((errorFetch) => {
            console.error("Error:", errorFetch);
            error.innerText = "No se pudo guardar el comentario";
            errorEnvio.classList.add("visible");
        });
};

btnAgregarComentario.addEventListener("click", agregarComentario);
