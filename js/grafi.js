
const voluntarios = [
    {nombre: "Metropolitana", cantidad: 12},
    {nombre: "Valparaíso", cantidad: 8},
    {nombre: "Biobío", cantidad: 15},
    {nombre: "Araucanía", cantidad: 2}
];

const avistamientos = [
    {nombre: "Paseriforme", cantidad: 5},
    {nombre: "Rapaz", cantidad: 10},
    {nombre: "Anseriforme", cantidad: 3},
    {nombre: "Corredoras", cantidad: 7}
];

const generarGrafico = (datos, idGrafico) => {

    let grafico = document.getElementById(idGrafico);

    datos.forEach(dato => {

        let fila = document.createElement("div");
        fila.classList.add("fila");

        let nombre = document.createElement("div");
        nombre.textContent = dato.nombre;

        let barra = document.createElement("div");
        barra.classList.add("barra");

        barra.style.width = `${dato.cantidad * 30}px`;

        let cantidad = document.createElement("div");
        cantidad.textContent = dato.cantidad;

        fila.appendChild(nombre);
        fila.appendChild(barra);
        fila.appendChild(cantidad);

        grafico.appendChild(fila);
    });
};

generarGrafico(voluntarios, "grafico1");
generarGrafico(avistamientos, "grafico2");