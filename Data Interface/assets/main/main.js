demo = {
  initDocumentationCharts: function () {
    if ($('#TempSensorChart').length != 0 && $('#AccelerometerSensorChart').length != 0) {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      dataTempSensorChart = {
        labels: ['+60 seconds', '+50 seconds', '+40 seconds', '+30 seconds', '+20 seconds', '+10 seconds', 'now'],
        series: [
          [75.6, 77.5, 76.3, 78.4, 79.8, 79.9, 80.2]
        ]
      };

      optionsTempSensorChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      }

      var TempSensorChart = new Chartist.Line('#TempSensorChart', dataTempSensorChart, optionsTempSensorChart);

      var animationHeaderChart = new Chartist.Line('#AccelerometerSensorChart', dataTempSensorChart, optionsTempSensorChart);
    }
  },

  initDashboardPageCharts: function () {

    if ($('#TempSensorChart').length != 0 || $('#AmbientLightSensorChart').length != 0 || $('#AccelerometerSensorChart').length != 0) {
      /* ----------==========     Daily Sales Chart initialization    ==========---------- */

      dataTempSensorChart = {
        labels: ['+60 seconds', '+50 seconds', '+40 seconds', '+30 seconds', '+20 seconds', '+10 seconds', 'now'],
        series: [
          [75.6, 77.5, 76.3, 78.4, 79.8, 79.9, 80.2]
        ]
      };

      optionsTempSensorChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      }

      var TempSensorChart = new Chartist.Line('#TempSensorChart', dataTempSensorChart, optionsTempSensorChart);

      md.startAnimationForLineChart(TempSensorChart);



      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      dataAmbientLightSensorChart = {
        labels: ['+60 seconds', '+50 seconds', '+40 seconds', '+30 seconds', '+20 seconds', '+10 seconds', 'now'],
        series: [
          [75.6, 77.5, 76.3, 78.4, 79.8, 79.9, 80.2]
        ]
      };

      optionsAmbientLightSensorChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      var AmbientLightSensorChart = new Chartist.Line('#AmbientLightSensorChart', dataAmbientLightSensorChart, optionsAmbientLightSensorChart);

      // start animation for the Completed Tasks Chart - Line Chart
      md.startAnimationForLineChart(AmbientLightSensorChart);


      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var dataAccelerometerSensorChart = {
        labels: ['+60 seconds', '+50 seconds', '+40 seconds', '+30 seconds', '+20 seconds', '+10 seconds', 'now'],
        series: [
          [542, 443, 320, 780, 553, 453, 326]

        ]
      };
      var optionsAccelerometerSensorChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      };
      var responsiveOptions = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var AccelerometerSensorChart = Chartist.Bar('#AccelerometerSensorChart', dataAccelerometerSensorChart, optionsAccelerometerSensorChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      md.startAnimationForBarChart(AccelerometerSensorChart);
    }
  },

}