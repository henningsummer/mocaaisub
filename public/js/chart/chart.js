Highcharts.chart('container3', {
    chart: {
      type: 'column',
      plotShadow: false,
      plotBackgroundColor: false,
    },
    title: {
      text: 'Média Execução '
    },
    subtitle: {
      text: 'Execução por imagem'
    },
    xAxis: {
      categories: [
        'MT-G5SPLUS',
        'MT-G2LTE2014',
        'SG-GTI8262',
        'SG-GTS6810B',
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'milissegundos'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.0f} ms</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Imagem 10 faces',
      data: [49, 71, 106, 1290]
  
    }, {
      name: 'Imagem 20 faces',
      data: [83, 78, 98, 900]
  
    }, {
      name: 'Imagems 30 faces',
      data: [48, 38, 39, 500]
  
    }, {
      name: 'Imagem 40 faces',
      data: [42, 33, 34, 1200]
  
    }]
  });