Highcharts.chart('container2', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Percentual de Bens Ofertados por Secretaria 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Sec. Educação',
        y: 11.84,
        sliced: true,
        selected: true
      }, {
        name: 'Sec. Finanças',
        y: 61.41
      }, {
        name: 'Sec. Saúde',
        y: 10.85
      }, {
        name: 'Sec. Governo',
        y: 4.67
      }]
    }]
  });