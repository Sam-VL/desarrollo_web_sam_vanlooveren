const avistamientos = [

    {nombre: "Condor", especie: "Rapaz", lugar: "Osorno", fecha: "2023-05-12", hora: "14:30"},
    {nombre: "Gallina", especie: "Corredoras", lugar: "Paine", fecha: "2025-03-22", hora: "09:15"},
    {nombre: "Queltehue", especie: "Paseriforme", lugar: "Valdivia", fecha: "2024-11-05", hora: "16:45"},
    {nombre: "Pato", especie: "Anseriforme", lugar: "Concepción", fecha: "2025-01-30", hora: "10:50"},
    {nombre: "Gaviota", especie: "Anseriforme", lugar: "Iquique", fecha: "2023-09-14", hora: "15:10"},
    {nombre: "Colibrí", especie: "Paseriforme", lugar: "La Serena", fecha: "2024-06-25", hora: "12:40"},
    {nombre: "Búho", especie: "Rapaz", lugar: "Temuco", fecha: "2025-04-18", hora: "20:30"},
    {nombre: "Pavo Real", especie: "Corredoras", lugar: "Viña del Mar", fecha: "2023-07-05", hora: "17:15"},
    {nombre: "Loro", especie: "Paseriforme", lugar: "Puerto Varas", fecha: "2024-03-12", hora: "14:00"},
    {nombre: "Cisne", especie: "Anseriforme", lugar: "Natales", fecha: "2025-05-22", hora: "09:45"},
    {nombre: "Pájaro Carpintero", especie: "Paseriforme", lugar: "Coyhaique", fecha: "2023-10-30", hora: "11:30"},
    {nombre: "Gallo", especie: "Corredoras", lugar: "Rancagua", fecha: "2024-08-15", hora: "07:50"},
    {nombre: "Pinguino", especie: "Corredoras", lugar: "Punta Arenas", fecha: "2025-02-28", hora: "16:10"},
    {nombre: "Cotorra", especie: "Paseriforme", lugar: "Santiago", fecha: "2023-11-20", hora: "13:30"},
    {nombre: "Ganso", especie: "Anseriforme", lugar: "Puerto Montt", fecha: "2024-04-05", hora: "10:20"},
    {nombre: "Pájaro Lira", especie: "Paseriforme", lugar: "Valparaíso", fecha: "2025-06-12", hora: "15:55"}

]

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

