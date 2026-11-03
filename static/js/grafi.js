const chart = Highcharts.chart('grafico1', {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Avistamientos de aves por día'
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Fecha'
    }
  },
  yAxis: {
    min: 0,
    allowDecimals: false,
    title: {
        text: 'Cantidad de voluntarios'
    }
  },
  series: [{
    name: 'Avistamientos',
    data: []
  }]
});

fetch('/get-stats-data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(rows => {
    const data = rows.map(({ date, count }) => {
      const [year, month, day] = date.split('-').map(Number);
      return [Date.UTC(year, month - 1, day), Number(count)];
    });

    chart.series[0].setData(data);
  })
  .catch(error => {
    console.error('No se pudieron cargar los avistamientos:', error);
    chart.setTitle({ text: 'No se pudieron cargar los datos' });
  });



const chartAves = Highcharts.chart('grafico2', {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Avistamientos por tipo de ave'
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b> avistamientos ({point.percentage:.1f}%)'
  },
  accessibility: {
    point: {
      valueSuffix: ' avistamientos'
    }
  },
  series: [{
    name: 'Avistamientos',
    colorByPoint: true,
    data: []
  }]
});

chartAves.showLoading('Cargando datos...');

fetch('/get-stats-aves')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(rows => {
    if (!Array.isArray(rows)) {
      throw new Error('La respuesta debe ser un arreglo JSON.');
    }

    const data = rows
      .map(({ name, count }) => ({
        name: String(name),
        y: Number(count)
      }))
      .filter(point => point.name && Number.isFinite(point.y) && point.y >= 0);

    chartAves.hideLoading();
    chartAves.series[0].setData(data);
  })
  .catch(error => {
    chartAves.hideLoading();
    console.error('No se pudieron cargar los avistamientos:', error);
    chartAves.setSubtitle({ text: 'No se pudieron cargar los datos' });
  });  


  
const chartComunas = Highcharts.chart('grafico3', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Voluntarios registrados por comuna'
  },
  xAxis: {
    categories: [],
    title: {
      text: 'Comuna'
    }
  },
  yAxis: {
    min: 0,
    allowDecimals: false,
    title: {
        text: 'Cantidad de voluntarios'
    }
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b> voluntarios'
  },
  accessibility: {
    point: {
      valueSuffix: ' voluntarios'
    }
  },
  series: [{
    name: 'Voluntarios',
    data: []
  }]
});

chartComunas.showLoading('Cargando datos...');

fetch('/get-stats-comunas')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(rows => {
    if (!Array.isArray(rows)) {
      throw new Error('La respuesta debe ser un arreglo JSON.');
    }

    const categories = rows.map(row => String(row.name));
    const data = rows.map(row => {
      const count = Number(row.count);

      if (!Number.isFinite(count)) {
        throw new Error(`Cantidad no válida para la comuna "${row.name}".`);
      }

      return count;
    });

    chartComunas.hideLoading();
    chartComunas.xAxis[0].setCategories(categories, false);
    chartComunas.series[0].setData(data);
  })
  .catch(error => {
    chartComunas.hideLoading();
    console.error('No se pudieron cargar los datos por comuna:', error);
    chartComunas.setSubtitle({ text: 'No se pudieron cargar los datos' });
  });
  