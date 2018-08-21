const liveFeed = true;

const dataPullInterval = 1000;
//Temp Sensor Default Data
var tempSensorArray = [73.5, 74.5, 75.5, 76.5, 77.5, { meta: 'description', value: 72.5 }, { meta: 'description', value: 73.5 }];
var humiditySensorArray = [40, 35, 40, 35, 40, 35, 40];

//Accelerometer Sensor Default Data
var accelerometerOrientationSensorArray = [0, 1, 2, 3, 4, 3, 2];
var accelerometerVibrationSensorArray = [1, 0, 0, 1, 0, 1, 0];

//Ambient Light Sensor Data
var ambientLightLevelSensorArray = [0, 1, 0, 1, 0, 1, 0];
var ambientBulbLevelSensorArray = [1, 0, 1, 0, 1, 0, 1];

//Distance Motion Sensor Date
var distanceMotionSensorArray = [0, 1, 0, 1, 0, 1, 0];

//Gesture Sensor Data
var gestureSensorArray = [115, 478, 375, 264, 556, 578, 439];

//Default X Axis Labels
var defaultLabel = ['+6 seconds', '+5 seconds', '+4 seconds', '+3 seconds', '+2 seconds', '+1 second', 'current'];

(function () {
  isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

    $('html').addClass('perfect-scrollbar-on');
  } else {
    $('html').addClass('perfect-scrollbar-off');
  }
})();


var breakCards = true;

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var mobile_menu_visible = 0,
  mobile_menu_initialized = false,
  toggle_initialized = false,
  bootstrap_nav_initialized = false;

var seq = 0,
  delays = 80,
  durations = 500;
var seq2 = 0,
  delays2 = 80,
  durations2 = 500;

$(document).ready(function () {

  $('body').bootstrapMaterialDesign();

  window_width = $(window).width();

  //    Activate bootstrap-select
  if ($(".selectpicker").length != 0) {
    $(".selectpicker").selectpicker();
  }
  //  Activate the tooltips
  $('[rel="tooltip"]').tooltip();
});

// activate collapse right menu when the windows is resized
$(window).resize(function () {
  // md.initSidebarsCheck();

  // reset the seq for charts drawing animations
  seq = seq2 = 0;

  setTimeout(function () {
    md.initDashboardPageCharts();
  }, 500);
});

md = {
  misc: {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
  },

  initSliders: function () {
  },

  initDashboardPageCharts: function () {

    if ($('#TempSensorChart').length != 0 || $('#AmbientLightSensorChart').length != 0 || $('#AccelerometerSensorChart').length != 0) {


      if (liveFeed) {
        // Call to http API to get ALL data
        setInterval(function () {
          getAllData();
        }, dataPullInterval);
      } else {
        getAllData();
      }


      /* ----------==========     Temperature Sensor Chart initialization    ==========---------- */

      dataTempSensorChart = {
        labels: defaultLabel,
        series: [
          tempSensorArray,
          humiditySensorArray

        ]
      };

      optionsTempSensorChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 20,
        high: 100,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        // plugins: [
        //   ctPointLabels({
        //     textAnchor: 'middle',
        //     labelInterpolationFnc: function (value) { return '$' + value.toFixed(2) }
        //   })
        // ]
      }

      var TempSensorChart = new Chartist.Line('#TempSensorChart', dataTempSensorChart, optionsTempSensorChart);

      md.startAnimationForLineChart(TempSensorChart);



      /* ----------==========     Ambient Light Sensor Chart initialization    ==========---------- */

      dataAmbientLightSensorChart = {
        labels: defaultLabel,
        series: [
          ambientLightLevelSensorArray,
          ambientBulbLevelSensorArray
        ]
      };

      optionsAmbientLightSensorChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 1.25,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      var AmbientLightSensorChart = new Chartist.Line('#AmbientLightSensorChart', dataAmbientLightSensorChart, optionsAmbientLightSensorChart);

      // start animation for the Ambient Light Sensor Chart - Line Chart
      md.startAnimationForLineChart(AmbientLightSensorChart);



      /* ----------==========     Gesture Sensor Chart initialization    ==========---------- */

      dataGestureSensorChart = {
        labels: defaultLabel,
        series: [
          gestureSensorArray
        ]
      };

      optionsGestureSensorChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 7,
        showArea: true,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      };

      responsiveOptions = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];

      var GestureSensorChart = new Chartist.Bar('#GestureSensorChart', dataGestureSensorChart, optionsGestureSensorChart, responsiveOptions);

      // start animation for the Gesture Sensor Chart - Line Chart
      md.startAnimationForBarChart(GestureSensorChart);



      /* ----------==========     Distance Motion Sensor Chart initialization    ==========---------- */

      dataDistanceMotionSensorChart = {
        labels: defaultLabel,
        series: [
          distanceMotionSensorArray
        ]
      };

      optionsDistanceMotionSensorChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 1.5,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      var DistanceMotionSensorChart = new Chartist.Line('#DistanceMotionSensorChart', dataDistanceMotionSensorChart, optionsDistanceMotionSensorChart);

      // start animation for the Distance Motion Sensor Chart - Line Chart
      md.startAnimationForLineChart(DistanceMotionSensorChart);




      /* ----------==========    Accelerometer Sensor Chart initialization    ==========---------- */

      dataAccelerometerSensorChart = {
        labels: defaultLabel,
        series: [
          accelerometerOrientationSensorArray,
          accelerometerVibrationSensorArray
        ]
      };
      optionsAccelerometerSensorChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 4,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      };
      responsiveOptions = [
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

  initMinimizeSidebar: function () {
  },


  initRightMenu: debounce(function () {
  }, 200),

  startAnimationForLineChart: function (chart) {

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  },
  startAnimationForBarChart: function (chart) {

    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

// HTTP REQUESTS
function getAllData() {

  console.log('Getting all data now...');

  const Http = new XMLHttpRequest();

  const url = 'http://localhost/refresh_data.php';

  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    if (Http.readyState == 4 && Http.status == 200) {
      if (Http.responseText) {

        var obj = JSON.parse(Http.responseText);
        console.log('Current Object:', obj);

        // TEMP SENSOR DATA
        tempSensorArray.shift();
        tempSensorArray.push(obj[0].temperature);
        humiditySensorArray.shift();
        humiditySensorArray.push(obj[0].humidity);

        dataTempSensorChart = {
          labels: defaultLabel,
          series: [
            tempSensorArray,
            humiditySensorArray
          ]
        };

        //change the elements on the html page
        document.getElementById('temperature').innerHTML = obj[0].temperature;
        document.getElementById('humidity').innerHTML = obj[0].humidity;


        new Chartist.Line('#TempSensorChart', dataTempSensorChart, optionsTempSensorChart);

        // ACCELEROMETER SENSOR DATA

        if (obj[0].orientation === 'Portrait_Up') {
          orientation = 1;
          orientationText = 'UP';

        } else if (obj[0].orientation === 'Portrait_Down') {
          orientation = 2;
          orientationText = 'DOWN';

        } else if (obj[0].orientation === 'Flat') {
          orientation = 3;
          orientationText = 'FLAT';

        } else if (obj[0].orientation === 'Landscape_Left') {
          orientation = 4;
          orientationText = 'LEFT';

        } else if (obj[0].orientation === 'Landscape_Right') {
          orientation = 5;
          orientationText = 'RIGHT';

        }

        if (obj[0].vibrating == 0) {
          vibratingText = 'NO';
        } else {
          vibratingText = 'YES';
        }

        accelerometerOrientationSensorArray.shift();
        accelerometerOrientationSensorArray.push(orientation);

        accelerometerVibrationSensorArray.shift();
        accelerometerVibrationSensorArray.push(obj[0].vibrating);

        dataAccelerometerSensorChart = {
          labels: defaultLabel,
          series: [
            accelerometerOrientationSensorArray,
            accelerometerVibrationSensorArray
          ]
        };

        //change the elements on the html page
        document.getElementById('orientation').innerHTML = orientationText;
        document.getElementById('vibrating').innerHTML = vibratingText;

        new Chartist.Bar('#AccelerometerSensorChart', dataAccelerometerSensorChart, optionsAccelerometerSensorChart, responsiveOptions);



        //AMBIENT LIGHT SENSOR DATA
        ambientLightLevelSensorArray.shift();
        ambientLightLevelSensorArray.push(obj[0].light_ratio);
        ambientBulbLevelSensorArray.shift();
        ambientBulbLevelSensorArray.push(obj[0].bulb_ratio);

        dataAmbientLightSensorChart = {
          labels: defaultLabel,
          series: [
            ambientLightLevelSensorArray,
            ambientBulbLevelSensorArray
          ]
        };

        //change the elements on the html page
        document.getElementById('light-level').innerHTML = obj[0].light_ratio;
        document.getElementById('bulb-level').innerHTML = obj[0].bulb_ratio;

        new Chartist.Line('#AmbientLightSensorChart', dataAmbientLightSensorChart, optionsAmbientLightSensorChart);

        //DISTANCE MOTION SENSOR DATA

        if (obj[0].obstruction == 0) {
          obstructionText = 'NO'
        } else {
          obstructionText = 'YES'
        }


        distanceMotionSensorArray.shift();
        distanceMotionSensorArray.push(obj[0].obstruction);

        dataDistanceMotionSensorChart = {
          labels: defaultLabel,
          series: [
            distanceMotionSensorArray
          ]
        };

        //change the elements on the html page
        document.getElementById('distance-motion').innerHTML = obstructionText;

        new Chartist.Line('#DistanceMotionSensorChart', dataDistanceMotionSensorChart, optionsDistanceMotionSensorChart);


        //GESTURE SENSOR DATA

        if (obj[0].gesture === 'NEAR') {
          gesture = 1;

        } else if (obj[0].gesture === 'FAR') {
          gesture = 2;

        } else if (obj[0].gesture === 'RIGHT') {
          gesture = 3;

        } else if (obj[0].gesture === 'LEFT') {
          gesture = 4;

        } else if (obj[0].gesture === 'UP') {
          gesture = 5;

        } else if (obj[0].gesture === 'DOWN') {
          gesture = 6;

        } else if (obj[0].gesture === 'NONE') {
          gesture = 7;
        }


        gestureSensorArray.shift();
        gestureSensorArray.push(gesture);

        dataGestureSensorChart = {
          labels: defaultLabel,
          series: [
            gestureSensorArray
          ]
        };

        //change the elements on the html page
        document.getElementById('gesture').innerHTML = obj[0].gesture;

        new Chartist.Bar('#GestureSensorChart', dataGestureSensorChart, optionsGestureSensorChart, responsiveOptions);


      }
    }
  }

  // Give default values of current sensor readings if API is unavailable
  // document.getElementById('temperature').innerHTML = 75;


}