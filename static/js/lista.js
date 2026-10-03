
let paginaActual = 1;
const avistamientosPorPagina = 5;

const filtrarAvistamientos = () => {
    let filtro = document.getElementById("filtro").value;
    let orden = document.getElementById("orden").value;
    let cuerpoTabla = document.getElementById("cuerpo-tabla");
    let resultados = [...avistamientos];

    if (filtro) {
        resultados = resultados.filter(avistamiento => avistamiento.especie === filtro);
    }

    if (orden === "fecha") {
        resultados = resultados.sort((a, b) => a.fecha.localeCompare(b.fecha));
    } else if (orden === "lugar") {
        resultados = resultados.sort((a, b) => a.lugar.localeCompare(b.lugar));
    }

    let inicio = (paginaActual - 1) * avistamientosPorPagina;
    let fin = inicio + avistamientosPorPagina;
    let total = Math.ceil(resultados.length / avistamientosPorPagina);
    let texto = document.getElementById("pagina-actual");
    texto.textContent = `Página ${paginaActual} de ${total}`;

    cuerpoTabla.replaceChildren();

    resultados.slice(inicio, fin).forEach(avistamiento => {
        let fila = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = avistamiento.nombre;
        let celdaEspecie = document.createElement("td");
        celdaEspecie.textContent = avistamiento.especie;
        let celdaHora = document.createElement("td");
        celdaHora.textContent = avistamiento.hora;
        let celdaFecha = document.createElement("td");
        celdaFecha.textContent = avistamiento.fecha;
        let celdaLugar = document.createElement("td");
        celdaLugar.textContent = avistamiento.lugar;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEspecie);
        fila.appendChild(celdaHora);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaLugar);

        cuerpoTabla.appendChild(fila);
    });
};

document.getElementById("filtro").addEventListener("change", filtrarAvistamientos);
document.getElementById("orden").addEventListener("change", filtrarAvistamientos);

document.getElementById("anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        filtrarAvistamientos();
    }
});

document.getElementById("siguiente").addEventListener("click", () => {
    paginaActual++;
    filtrarAvistamientos();
});


filtrarAvistamientos();

