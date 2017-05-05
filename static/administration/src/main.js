window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var ol = require('openlayers');
// var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);
document.getElementById('dashboard').style.display = "block";
document.getElementById('tab1').className += " active";

document.getElementsByClassName("layertype")[0].disabled = true;
document.getElementsByClassName("bmpbtn")[0].disabled = true;
document.getElementById("runoptimization").disabled = true;

$("#loading-page").css('height', 150);
$("#loading-info").css('margin-top', ($("#loading-page2").height() - 400) / 2);

$("#loading-page2").css('height', 150);
$("#loading-info2").css('margin-top', ($("#loading-page2").height() - 400) / 2);

document.getElementById('tab1').addEventListener("click", function(evt) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById('dashboard').style.display = "block";
    evt.currentTarget.className += " active";
});

document.getElementById('tab2').addEventListener("click", function(evt) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById('evaluation').style.display = "block";
    evt.currentTarget.className += " active";
    evaluationmap.updateSize();
});

document.getElementById('tab3').addEventListener("click", function(evt) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById('optimization').style.display = "block";
    evt.currentTarget.className += " active";
    optimizationmap.updateSize();
});

var welcomeBtn = document.body.getElementsByClassName('tablinks')[0];
welcomeBtn.disabled = true;

$(".reportexit").hide();

$("#generatereportbtn").click(function(event) {
    /* Act on the event */
    $(".reportenter").slideUp("slow", function() {
        $(".reportexit").show("slow");
    });
});
$("#closereport").click(function(event) {
    /* Act on the event */
    $(".reportexit").hide();
    $(".reportenter").show("slow");
});

$("#generatereportbtn2").click(function(event) {
    /* Act on the event */
    $(".reportenter").slideUp("slow", function() {
        $(".reportexit").show("slow");
    });
});
$("#closereport2").click(function(event) {
    /* Act on the event */
    $(".reportexit").hide();
    $(".reportenter").show("slow");
});

Highcharts.chart('evaluationchart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    credits: {
        enabled: false
    },
    xAxis: [{
        categories: ['Iter:10', 'Iter:9', 'Iter:8', 'Iter:7', 'Iter:6', 'Iter:5',
            'Iter:4', 'Iter:3', 'Iter:2', 'Iter:1'
        ],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '$ ',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'BMP Cost',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: "",
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 20,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        enabled: false
    },
    series: [{
        name: 'NetReturn',
        type: 'column',
        yAxis: 1,
        data: [],
        tooltip: {
            valueSuffix: ' $'
        }

    }, {
        name: "",
        type: 'spline',
        data: [],
        tooltip: {
            valueSuffix: " "
        }
    }]
});

Highcharts.chart('optimizationchart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
    },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    credits: {
        enabled: false
    },
    xAxis: [{
        categories: ['Iter:10', 'Iter:9', 'Iter:8', 'Iter:7', 'Iter:6', 'Iter:5',
            'Iter:4', 'Iter:3', 'Iter:2', 'Iter:1'
        ],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '$ ',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'BMP Cost',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: "",
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 20,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        enabled: false
    },
    series: [{
        name: 'NetReturn',
        type: 'column',
        yAxis: 1,
        data: [],
        tooltip: {
            valueSuffix: ' $'
        }

    }, {
        name: "",
        type: 'spline',
        data: [],
        tooltip: {
            valueSuffix: " "
        }
    }]
});

Highcharts.chart('statchart', {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'USD to EUR exchange rate over time'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        name: 'USD to EUR',
        data: [
            [Date.UTC(2013, 5, 2), 0.7695],
            [Date.UTC(2013, 5, 3), 0.7648],
            [Date.UTC(2013, 5, 4), 0.7645],
            [Date.UTC(2013, 5, 5), 0.7638],
            [Date.UTC(2013, 5, 6), 0.7549],
            [Date.UTC(2013, 5, 7), 0.7562],
            [Date.UTC(2013, 5, 9), 0.7574],
            [Date.UTC(2013, 5, 10), 0.7543],
            [Date.UTC(2013, 5, 11), 0.7510],
            [Date.UTC(2013, 5, 12), 0.7498],
            [Date.UTC(2013, 5, 13), 0.7477],
            [Date.UTC(2013, 5, 14), 0.7492],
            [Date.UTC(2013, 5, 16), 0.7487],
            [Date.UTC(2013, 5, 17), 0.7480],
            [Date.UTC(2013, 5, 18), 0.7466],
            [Date.UTC(2013, 5, 19), 0.7521],
            [Date.UTC(2013, 5, 20), 0.7564],
            [Date.UTC(2013, 5, 21), 0.7621],
            [Date.UTC(2013, 5, 23), 0.7630],
            [Date.UTC(2013, 5, 24), 0.7623],
            [Date.UTC(2013, 5, 25), 0.7644],
            [Date.UTC(2013, 5, 26), 0.7685],
            [Date.UTC(2013, 5, 27), 0.7671],
            [Date.UTC(2013, 5, 28), 0.7687],
            [Date.UTC(2013, 5, 30), 0.7687],
            [Date.UTC(2013, 6, 1), 0.7654],
            [Date.UTC(2013, 6, 2), 0.7705],
            [Date.UTC(2013, 6, 3), 0.7687],
            [Date.UTC(2013, 6, 4), 0.7744],
            [Date.UTC(2013, 6, 5), 0.7793],
            [Date.UTC(2013, 6, 7), 0.7804],
            [Date.UTC(2013, 6, 8), 0.7770],
            [Date.UTC(2013, 6, 9), 0.7824],
            [Date.UTC(2013, 6, 10), 0.7705],
            [Date.UTC(2013, 6, 11), 0.7635],
            [Date.UTC(2013, 6, 12), 0.7652],
            [Date.UTC(2013, 6, 14), 0.7656],
            [Date.UTC(2013, 6, 15), 0.7655],
            [Date.UTC(2013, 6, 16), 0.7598],
            [Date.UTC(2013, 6, 17), 0.7619],
            [Date.UTC(2013, 6, 18), 0.7628],
            [Date.UTC(2013, 6, 19), 0.7609],
            [Date.UTC(2013, 6, 21), 0.7599],
            [Date.UTC(2013, 6, 22), 0.7584],
            [Date.UTC(2013, 6, 23), 0.7562],
            [Date.UTC(2013, 6, 24), 0.7575],
            [Date.UTC(2013, 6, 25), 0.7531],
            [Date.UTC(2013, 6, 26), 0.7530],
            [Date.UTC(2013, 6, 28), 0.7526],
            [Date.UTC(2013, 6, 29), 0.7540],
            [Date.UTC(2013, 6, 30), 0.7540],
            [Date.UTC(2013, 6, 31), 0.7518],
            [Date.UTC(2013, 7, 1), 0.7571],
            [Date.UTC(2013, 7, 2), 0.7529],
            [Date.UTC(2013, 7, 4), 0.7532],
            [Date.UTC(2013, 7, 5), 0.7542],
            [Date.UTC(2013, 7, 6), 0.7515],
            [Date.UTC(2013, 7, 7), 0.7498],
            [Date.UTC(2013, 7, 8), 0.7473],
            [Date.UTC(2013, 7, 9), 0.7494],
            [Date.UTC(2013, 7, 11), 0.7497],
            [Date.UTC(2013, 7, 12), 0.7519],
            [Date.UTC(2013, 7, 13), 0.7540],
            [Date.UTC(2013, 7, 14), 0.7543],
            [Date.UTC(2013, 7, 15), 0.7492],
            [Date.UTC(2013, 7, 16), 0.7502],
            [Date.UTC(2013, 7, 18), 0.7503],
            [Date.UTC(2013, 7, 19), 0.7499],
            [Date.UTC(2013, 7, 20), 0.7453],
            [Date.UTC(2013, 7, 21), 0.7487],
            [Date.UTC(2013, 7, 22), 0.7487],
            [Date.UTC(2013, 7, 23), 0.7472],
            [Date.UTC(2013, 7, 25), 0.7471],
            [Date.UTC(2013, 7, 26), 0.7480],
            [Date.UTC(2013, 7, 27), 0.7467],
            [Date.UTC(2013, 7, 28), 0.7497],
            [Date.UTC(2013, 7, 29), 0.7552],
            [Date.UTC(2013, 7, 30), 0.7562],
            [Date.UTC(2013, 8, 1), 0.7572],
            [Date.UTC(2013, 8, 2), 0.7581],
            [Date.UTC(2013, 8, 3), 0.7593],
            [Date.UTC(2013, 8, 4), 0.7571],
            [Date.UTC(2013, 8, 5), 0.7622],
            [Date.UTC(2013, 8, 6), 0.7588],
            [Date.UTC(2013, 8, 8), 0.7591],
            [Date.UTC(2013, 8, 9), 0.7544],
            [Date.UTC(2013, 8, 10), 0.7537],
            [Date.UTC(2013, 8, 11), 0.7512],
            [Date.UTC(2013, 8, 12), 0.7519],
            [Date.UTC(2013, 8, 13), 0.7522],
            [Date.UTC(2013, 8, 15), 0.7486],
            [Date.UTC(2013, 8, 16), 0.7500],
            [Date.UTC(2013, 8, 17), 0.7486],
            [Date.UTC(2013, 8, 18), 0.7396],
            [Date.UTC(2013, 8, 19), 0.7391],
            [Date.UTC(2013, 8, 20), 0.7394],
            [Date.UTC(2013, 8, 22), 0.7389],
            [Date.UTC(2013, 8, 23), 0.7411],
            [Date.UTC(2013, 8, 24), 0.7422],
            [Date.UTC(2013, 8, 25), 0.7393],
            [Date.UTC(2013, 8, 26), 0.7413],
            [Date.UTC(2013, 8, 27), 0.7396],
            [Date.UTC(2013, 8, 29), 0.7410],
            [Date.UTC(2013, 8, 30), 0.7393],
            [Date.UTC(2013, 9, 1), 0.7393],
            [Date.UTC(2013, 9, 2), 0.7365],
            [Date.UTC(2013, 9, 3), 0.7343],
            [Date.UTC(2013, 9, 4), 0.7376],
            [Date.UTC(2013, 9, 6), 0.7370],
            [Date.UTC(2013, 9, 7), 0.7362],
            [Date.UTC(2013, 9, 8), 0.7368],
            [Date.UTC(2013, 9, 9), 0.7393],
            [Date.UTC(2013, 9, 10), 0.7397],
            [Date.UTC(2013, 9, 11), 0.7385],
            [Date.UTC(2013, 9, 13), 0.7377],
            [Date.UTC(2013, 9, 14), 0.7374],
            [Date.UTC(2013, 9, 15), 0.7395],
            [Date.UTC(2013, 9, 16), 0.7389],
            [Date.UTC(2013, 9, 17), 0.7312],
            [Date.UTC(2013, 9, 18), 0.7307],
            [Date.UTC(2013, 9, 20), 0.7309],
            [Date.UTC(2013, 9, 21), 0.7308],
            [Date.UTC(2013, 9, 22), 0.7256],
            [Date.UTC(2013, 9, 23), 0.7258],
            [Date.UTC(2013, 9, 24), 0.7247],
            [Date.UTC(2013, 9, 25), 0.7244],
            [Date.UTC(2013, 9, 27), 0.7244],
            [Date.UTC(2013, 9, 28), 0.7255],
            [Date.UTC(2013, 9, 29), 0.7275],
            [Date.UTC(2013, 9, 30), 0.7280],
            [Date.UTC(2013, 9, 31), 0.7361],
            [Date.UTC(2013, 10, 1), 0.7415],
            [Date.UTC(2013, 10, 3), 0.7411],
            [Date.UTC(2013, 10, 4), 0.7399],
            [Date.UTC(2013, 10, 5), 0.7421],
            [Date.UTC(2013, 10, 6), 0.7400],
            [Date.UTC(2013, 10, 7), 0.7452],
            [Date.UTC(2013, 10, 8), 0.7479],
            [Date.UTC(2013, 10, 10), 0.7492],
            [Date.UTC(2013, 10, 11), 0.7460],
            [Date.UTC(2013, 10, 12), 0.7442],
            [Date.UTC(2013, 10, 13), 0.7415],
            [Date.UTC(2013, 10, 14), 0.7429],
            [Date.UTC(2013, 10, 15), 0.7410],
            [Date.UTC(2013, 10, 17), 0.7417],
            [Date.UTC(2013, 10, 18), 0.7405],
            [Date.UTC(2013, 10, 19), 0.7386],
            [Date.UTC(2013, 10, 20), 0.7441],
            [Date.UTC(2013, 10, 21), 0.7418],
            [Date.UTC(2013, 10, 22), 0.7376],
            [Date.UTC(2013, 10, 24), 0.7379],
            [Date.UTC(2013, 10, 25), 0.7399],
            [Date.UTC(2013, 10, 26), 0.7369],
            [Date.UTC(2013, 10, 27), 0.7365],
            [Date.UTC(2013, 10, 28), 0.7350],
            [Date.UTC(2013, 10, 29), 0.7358],
            [Date.UTC(2013, 11, 1), 0.7362],
            [Date.UTC(2013, 11, 2), 0.7385],
            [Date.UTC(2013, 11, 3), 0.7359],
            [Date.UTC(2013, 11, 4), 0.7357],
            [Date.UTC(2013, 11, 5), 0.7317],
            [Date.UTC(2013, 11, 6), 0.7297],
            [Date.UTC(2013, 11, 8), 0.7296],
            [Date.UTC(2013, 11, 9), 0.7279],
            [Date.UTC(2013, 11, 10), 0.7267],
            [Date.UTC(2013, 11, 11), 0.7254],
            [Date.UTC(2013, 11, 12), 0.7270],
            [Date.UTC(2013, 11, 13), 0.7276],
            [Date.UTC(2013, 11, 15), 0.7278],
            [Date.UTC(2013, 11, 16), 0.7267],
            [Date.UTC(2013, 11, 17), 0.7263],
            [Date.UTC(2013, 11, 18), 0.7307],
            [Date.UTC(2013, 11, 19), 0.7319],
            [Date.UTC(2013, 11, 20), 0.7315],
            [Date.UTC(2013, 11, 22), 0.7311],
            [Date.UTC(2013, 11, 23), 0.7301],
            [Date.UTC(2013, 11, 24), 0.7308],
            [Date.UTC(2013, 11, 25), 0.7310],
            [Date.UTC(2013, 11, 26), 0.7304],
            [Date.UTC(2013, 11, 27), 0.7277],
            [Date.UTC(2013, 11, 29), 0.7272],
            [Date.UTC(2013, 11, 30), 0.7244],
            [Date.UTC(2013, 11, 31), 0.7275],
            [Date.UTC(2014, 0, 1), 0.7271],
            [Date.UTC(2014, 0, 2), 0.7314],
            [Date.UTC(2014, 0, 3), 0.7359],
            [Date.UTC(2014, 0, 5), 0.7355],
            [Date.UTC(2014, 0, 6), 0.7338],
            [Date.UTC(2014, 0, 7), 0.7345],
            [Date.UTC(2014, 0, 8), 0.7366],
            [Date.UTC(2014, 0, 9), 0.7349],
            [Date.UTC(2014, 0, 10), 0.7316],
            [Date.UTC(2014, 0, 12), 0.7315],
            [Date.UTC(2014, 0, 13), 0.7315],
            [Date.UTC(2014, 0, 14), 0.7310],
            [Date.UTC(2014, 0, 15), 0.7350],
            [Date.UTC(2014, 0, 16), 0.7341],
            [Date.UTC(2014, 0, 17), 0.7385],
            [Date.UTC(2014, 0, 19), 0.7392],
            [Date.UTC(2014, 0, 20), 0.7379],
            [Date.UTC(2014, 0, 21), 0.7373],
            [Date.UTC(2014, 0, 22), 0.7381],
            [Date.UTC(2014, 0, 23), 0.7301],
            [Date.UTC(2014, 0, 24), 0.7311],
            [Date.UTC(2014, 0, 26), 0.7306],
            [Date.UTC(2014, 0, 27), 0.7314],
            [Date.UTC(2014, 0, 28), 0.7316],
            [Date.UTC(2014, 0, 29), 0.7319],
            [Date.UTC(2014, 0, 30), 0.7377],
            [Date.UTC(2014, 0, 31), 0.7415],
            [Date.UTC(2014, 1, 2), 0.7414],
            [Date.UTC(2014, 1, 3), 0.7393],
            [Date.UTC(2014, 1, 4), 0.7397],
            [Date.UTC(2014, 1, 5), 0.7389],
            [Date.UTC(2014, 1, 6), 0.7358],
            [Date.UTC(2014, 1, 7), 0.7334],
            [Date.UTC(2014, 1, 9), 0.7343],
            [Date.UTC(2014, 1, 10), 0.7328],
            [Date.UTC(2014, 1, 11), 0.7332],
            [Date.UTC(2014, 1, 12), 0.7356],
            [Date.UTC(2014, 1, 13), 0.7309],
            [Date.UTC(2014, 1, 14), 0.7304],
            [Date.UTC(2014, 1, 16), 0.7300],
            [Date.UTC(2014, 1, 17), 0.7295],
            [Date.UTC(2014, 1, 18), 0.7268],
            [Date.UTC(2014, 1, 19), 0.7281],
            [Date.UTC(2014, 1, 20), 0.7289],
            [Date.UTC(2014, 1, 21), 0.7278],
            [Date.UTC(2014, 1, 23), 0.7280],
            [Date.UTC(2014, 1, 24), 0.7280],
            [Date.UTC(2014, 1, 25), 0.7275],
            [Date.UTC(2014, 1, 26), 0.7306],
            [Date.UTC(2014, 1, 27), 0.7295],
            [Date.UTC(2014, 1, 28), 0.7245],
            [Date.UTC(2014, 2, 2), 0.7259],
            [Date.UTC(2014, 2, 3), 0.7280],
            [Date.UTC(2014, 2, 4), 0.7276],
            [Date.UTC(2014, 2, 5), 0.7282],
            [Date.UTC(2014, 2, 6), 0.7215],
            [Date.UTC(2014, 2, 7), 0.7206],
            [Date.UTC(2014, 2, 9), 0.7206],
            [Date.UTC(2014, 2, 10), 0.7207],
            [Date.UTC(2014, 2, 11), 0.7216],
            [Date.UTC(2014, 2, 12), 0.7192],
            [Date.UTC(2014, 2, 13), 0.7210],
            [Date.UTC(2014, 2, 14), 0.7187],
            [Date.UTC(2014, 2, 16), 0.7188],
            [Date.UTC(2014, 2, 17), 0.7183],
            [Date.UTC(2014, 2, 18), 0.7177],
            [Date.UTC(2014, 2, 19), 0.7229],
            [Date.UTC(2014, 2, 20), 0.7258],
            [Date.UTC(2014, 2, 21), 0.7249],
            [Date.UTC(2014, 2, 23), 0.7247],
            [Date.UTC(2014, 2, 24), 0.7226],
            [Date.UTC(2014, 2, 25), 0.7232],
            [Date.UTC(2014, 2, 26), 0.7255],
            [Date.UTC(2014, 2, 27), 0.7278],
            [Date.UTC(2014, 2, 28), 0.7271],
            [Date.UTC(2014, 2, 30), 0.7272],
            [Date.UTC(2014, 2, 31), 0.7261],
            [Date.UTC(2014, 3, 1), 0.7250],
            [Date.UTC(2014, 3, 2), 0.7264],
            [Date.UTC(2014, 3, 3), 0.7289],
            [Date.UTC(2014, 3, 4), 0.7298],
            [Date.UTC(2014, 3, 6), 0.7298],
            [Date.UTC(2014, 3, 7), 0.7278],
            [Date.UTC(2014, 3, 8), 0.7248],
            [Date.UTC(2014, 3, 9), 0.7218],
            [Date.UTC(2014, 3, 10), 0.7200],
            [Date.UTC(2014, 3, 11), 0.7202],
            [Date.UTC(2014, 3, 13), 0.7222],
            [Date.UTC(2014, 3, 14), 0.7236],
            [Date.UTC(2014, 3, 15), 0.7239],
            [Date.UTC(2014, 3, 16), 0.7238],
            [Date.UTC(2014, 3, 17), 0.7238],
            [Date.UTC(2014, 3, 18), 0.7238],
            [Date.UTC(2014, 3, 20), 0.7239],
            [Date.UTC(2014, 3, 21), 0.7250],
            [Date.UTC(2014, 3, 22), 0.7244],
            [Date.UTC(2014, 3, 23), 0.7238],
            [Date.UTC(2014, 3, 24), 0.7229],
            [Date.UTC(2014, 3, 25), 0.7229],
            [Date.UTC(2014, 3, 27), 0.7226],
            [Date.UTC(2014, 3, 28), 0.7220],
            [Date.UTC(2014, 3, 29), 0.7240],
            [Date.UTC(2014, 3, 30), 0.7211],
            [Date.UTC(2014, 4, 1), 0.7210],
            [Date.UTC(2014, 4, 2), 0.7209],
            [Date.UTC(2014, 4, 4), 0.7209],
            [Date.UTC(2014, 4, 5), 0.7207],
            [Date.UTC(2014, 4, 6), 0.7180],
            [Date.UTC(2014, 4, 7), 0.7188],
            [Date.UTC(2014, 4, 8), 0.7225],
            [Date.UTC(2014, 4, 9), 0.7268],
            [Date.UTC(2014, 4, 11), 0.7267],
            [Date.UTC(2014, 4, 12), 0.7269],
            [Date.UTC(2014, 4, 13), 0.7297],
            [Date.UTC(2014, 4, 14), 0.7291],
            [Date.UTC(2014, 4, 15), 0.7294],
            [Date.UTC(2014, 4, 16), 0.7302],
            [Date.UTC(2014, 4, 18), 0.7298],
            [Date.UTC(2014, 4, 19), 0.7295],
            [Date.UTC(2014, 4, 20), 0.7298],
            [Date.UTC(2014, 4, 21), 0.7307],
            [Date.UTC(2014, 4, 22), 0.7323],
            [Date.UTC(2014, 4, 23), 0.7335],
            [Date.UTC(2014, 4, 25), 0.7338],
            [Date.UTC(2014, 4, 26), 0.7329],
            [Date.UTC(2014, 4, 27), 0.7335],
            [Date.UTC(2014, 4, 28), 0.7358],
            [Date.UTC(2014, 4, 29), 0.7351],
            [Date.UTC(2014, 4, 30), 0.7337],
            [Date.UTC(2014, 5, 1), 0.7338],
            [Date.UTC(2014, 5, 2), 0.7355],
            [Date.UTC(2014, 5, 3), 0.7338],
            [Date.UTC(2014, 5, 4), 0.7353],
            [Date.UTC(2014, 5, 5), 0.7321],
            [Date.UTC(2014, 5, 6), 0.7330],
            [Date.UTC(2014, 5, 8), 0.7327],
            [Date.UTC(2014, 5, 9), 0.7356],
            [Date.UTC(2014, 5, 10), 0.7381],
            [Date.UTC(2014, 5, 11), 0.7389],
            [Date.UTC(2014, 5, 12), 0.7379],
            [Date.UTC(2014, 5, 13), 0.7384],
            [Date.UTC(2014, 5, 15), 0.7388],
            [Date.UTC(2014, 5, 16), 0.7367],
            [Date.UTC(2014, 5, 17), 0.7382],
            [Date.UTC(2014, 5, 18), 0.7356],
            [Date.UTC(2014, 5, 19), 0.7349],
            [Date.UTC(2014, 5, 20), 0.7353],
            [Date.UTC(2014, 5, 22), 0.7357],
            [Date.UTC(2014, 5, 23), 0.7350],
            [Date.UTC(2014, 5, 24), 0.7350],
            [Date.UTC(2014, 5, 25), 0.7337],
            [Date.UTC(2014, 5, 26), 0.7347],
            [Date.UTC(2014, 5, 27), 0.7327],
            [Date.UTC(2014, 5, 29), 0.7330],
            [Date.UTC(2014, 5, 30), 0.7304],
            [Date.UTC(2014, 6, 1), 0.7310],
            [Date.UTC(2014, 6, 2), 0.7320],
            [Date.UTC(2014, 6, 3), 0.7347],
            [Date.UTC(2014, 6, 4), 0.7356],
            [Date.UTC(2014, 6, 6), 0.7360],
            [Date.UTC(2014, 6, 7), 0.7350],
            [Date.UTC(2014, 6, 8), 0.7346],
            [Date.UTC(2014, 6, 9), 0.7329],
            [Date.UTC(2014, 6, 10), 0.7348],
            [Date.UTC(2014, 6, 11), 0.7349],
            [Date.UTC(2014, 6, 13), 0.7352],
            [Date.UTC(2014, 6, 14), 0.7342],
            [Date.UTC(2014, 6, 15), 0.7369],
            [Date.UTC(2014, 6, 16), 0.7393],
            [Date.UTC(2014, 6, 17), 0.7392],
            [Date.UTC(2014, 6, 18), 0.7394],
            [Date.UTC(2014, 6, 20), 0.7390],
            [Date.UTC(2014, 6, 21), 0.7395],
            [Date.UTC(2014, 6, 22), 0.7427],
            [Date.UTC(2014, 6, 23), 0.7427],
            [Date.UTC(2014, 6, 24), 0.7428],
            [Date.UTC(2014, 6, 25), 0.7446],
            [Date.UTC(2014, 6, 27), 0.7447],
            [Date.UTC(2014, 6, 28), 0.7440],
            [Date.UTC(2014, 6, 29), 0.7458],
            [Date.UTC(2014, 6, 30), 0.7464],
            [Date.UTC(2014, 6, 31), 0.7469],
            [Date.UTC(2014, 7, 1), 0.7446],
            [Date.UTC(2014, 7, 3), 0.7447],
            [Date.UTC(2014, 7, 4), 0.7450],
            [Date.UTC(2014, 7, 5), 0.7477],
            [Date.UTC(2014, 7, 6), 0.7472],
            [Date.UTC(2014, 7, 7), 0.7483],
            [Date.UTC(2014, 7, 8), 0.7457],
            [Date.UTC(2014, 7, 10), 0.7460],
            [Date.UTC(2014, 7, 11), 0.7470],
            [Date.UTC(2014, 7, 12), 0.7480],
            [Date.UTC(2014, 7, 13), 0.7482],
            [Date.UTC(2014, 7, 14), 0.7482],
            [Date.UTC(2014, 7, 15), 0.7463],
            [Date.UTC(2014, 7, 17), 0.7469],
            [Date.UTC(2014, 7, 18), 0.7483],
            [Date.UTC(2014, 7, 19), 0.7508],
            [Date.UTC(2014, 7, 20), 0.7541],
            [Date.UTC(2014, 7, 21), 0.7529],
            [Date.UTC(2014, 7, 22), 0.7551],
            [Date.UTC(2014, 7, 24), 0.7577],
            [Date.UTC(2014, 7, 25), 0.7580],
            [Date.UTC(2014, 7, 26), 0.7593],
            [Date.UTC(2014, 7, 27), 0.7580],
            [Date.UTC(2014, 7, 28), 0.7585],
            [Date.UTC(2014, 7, 29), 0.7614],
            [Date.UTC(2014, 7, 31), 0.7618],
            [Date.UTC(2014, 8, 1), 0.7618],
            [Date.UTC(2014, 8, 2), 0.7614],
            [Date.UTC(2014, 8, 3), 0.7604],
            [Date.UTC(2014, 8, 4), 0.7725],
            [Date.UTC(2014, 8, 5), 0.7722],
            [Date.UTC(2014, 8, 7), 0.7721],
            [Date.UTC(2014, 8, 8), 0.7753],
            [Date.UTC(2014, 8, 9), 0.7730],
            [Date.UTC(2014, 8, 10), 0.7742],
            [Date.UTC(2014, 8, 11), 0.7736],
            [Date.UTC(2014, 8, 12), 0.7713],
            [Date.UTC(2014, 8, 14), 0.7717],
            [Date.UTC(2014, 8, 15), 0.7727],
            [Date.UTC(2014, 8, 16), 0.7716],
            [Date.UTC(2014, 8, 17), 0.7772],
            [Date.UTC(2014, 8, 18), 0.7739],
            [Date.UTC(2014, 8, 19), 0.7794],
            [Date.UTC(2014, 8, 21), 0.7788],
            [Date.UTC(2014, 8, 22), 0.7782],
            [Date.UTC(2014, 8, 23), 0.7784],
            [Date.UTC(2014, 8, 24), 0.7824],
            [Date.UTC(2014, 8, 25), 0.7843],
            [Date.UTC(2014, 8, 26), 0.7884],
            [Date.UTC(2014, 8, 28), 0.7891],
            [Date.UTC(2014, 8, 29), 0.7883],
            [Date.UTC(2014, 8, 30), 0.7916],
            [Date.UTC(2014, 9, 1), 0.7922],
            [Date.UTC(2014, 9, 2), 0.7893],
            [Date.UTC(2014, 9, 3), 0.7989],
            [Date.UTC(2014, 9, 5), 0.7992],
            [Date.UTC(2014, 9, 6), 0.7903],
            [Date.UTC(2014, 9, 7), 0.7893],
            [Date.UTC(2014, 9, 8), 0.7853],
            [Date.UTC(2014, 9, 9), 0.7880],
            [Date.UTC(2014, 9, 10), 0.7919],
            [Date.UTC(2014, 9, 12), 0.7912],
            [Date.UTC(2014, 9, 13), 0.7842],
            [Date.UTC(2014, 9, 14), 0.7900],
            [Date.UTC(2014, 9, 15), 0.7790],
            [Date.UTC(2014, 9, 16), 0.7806],
            [Date.UTC(2014, 9, 17), 0.7835],
            [Date.UTC(2014, 9, 19), 0.7844],
            [Date.UTC(2014, 9, 20), 0.7813],
            [Date.UTC(2014, 9, 21), 0.7864],
            [Date.UTC(2014, 9, 22), 0.7905],
            [Date.UTC(2014, 9, 23), 0.7907],
            [Date.UTC(2014, 9, 24), 0.7893],
            [Date.UTC(2014, 9, 26), 0.7889],
            [Date.UTC(2014, 9, 27), 0.7875],
            [Date.UTC(2014, 9, 28), 0.7853],
            [Date.UTC(2014, 9, 29), 0.7916],
            [Date.UTC(2014, 9, 30), 0.7929],
            [Date.UTC(2014, 9, 31), 0.7984],
            [Date.UTC(2014, 10, 2), 0.7999],
            [Date.UTC(2014, 10, 3), 0.8012],
            [Date.UTC(2014, 10, 4), 0.7971],
            [Date.UTC(2014, 10, 5), 0.8009],
            [Date.UTC(2014, 10, 6), 0.8081],
            [Date.UTC(2014, 10, 7), 0.8030],
            [Date.UTC(2014, 10, 9), 0.8025],
            [Date.UTC(2014, 10, 10), 0.8051],
            [Date.UTC(2014, 10, 11), 0.8016],
            [Date.UTC(2014, 10, 12), 0.8040],
            [Date.UTC(2014, 10, 13), 0.8015],
            [Date.UTC(2014, 10, 14), 0.7985],
            [Date.UTC(2014, 10, 16), 0.7988],
            [Date.UTC(2014, 10, 17), 0.8032],
            [Date.UTC(2014, 10, 18), 0.7976],
            [Date.UTC(2014, 10, 19), 0.7965],
            [Date.UTC(2014, 10, 20), 0.7975],
            [Date.UTC(2014, 10, 21), 0.8071],
            [Date.UTC(2014, 10, 23), 0.8082],
            [Date.UTC(2014, 10, 24), 0.8037],
            [Date.UTC(2014, 10, 25), 0.8016],
            [Date.UTC(2014, 10, 26), 0.7996],
            [Date.UTC(2014, 10, 27), 0.8022],
            [Date.UTC(2014, 10, 28), 0.8031],
            [Date.UTC(2014, 10, 30), 0.8040],
            [Date.UTC(2014, 11, 1), 0.8020],
            [Date.UTC(2014, 11, 2), 0.8075],
            [Date.UTC(2014, 11, 3), 0.8123],
            [Date.UTC(2014, 11, 4), 0.8078],
            [Date.UTC(2014, 11, 5), 0.8139],
            [Date.UTC(2014, 11, 7), 0.8135],
            [Date.UTC(2014, 11, 8), 0.8119],
            [Date.UTC(2014, 11, 9), 0.8081],
            [Date.UTC(2014, 11, 10), 0.8034],
            [Date.UTC(2014, 11, 11), 0.8057],
            [Date.UTC(2014, 11, 12), 0.8024],
            [Date.UTC(2014, 11, 14), 0.8024],
            [Date.UTC(2014, 11, 15), 0.8040],
            [Date.UTC(2014, 11, 16), 0.7993],
            [Date.UTC(2014, 11, 17), 0.8102],
            [Date.UTC(2014, 11, 18), 0.8139],
            [Date.UTC(2014, 11, 19), 0.8177],
            [Date.UTC(2014, 11, 21), 0.8180],
            [Date.UTC(2014, 11, 22), 0.8176],
            [Date.UTC(2014, 11, 23), 0.8215],
            [Date.UTC(2014, 11, 24), 0.8200],
            [Date.UTC(2014, 11, 25), 0.8182],
            [Date.UTC(2014, 11, 26), 0.8213],
            [Date.UTC(2014, 11, 28), 0.8218],
            [Date.UTC(2014, 11, 29), 0.8229],
            [Date.UTC(2014, 11, 30), 0.8225],
            [Date.UTC(2014, 11, 31), 0.8266],
            [Date.UTC(2015, 0, 1), 0.8262],
            [Date.UTC(2015, 0, 2), 0.8331],
            [Date.UTC(2015, 0, 4), 0.8371],
            [Date.UTC(2015, 0, 5), 0.8380],
            [Date.UTC(2015, 0, 6), 0.8411],
            [Date.UTC(2015, 0, 7), 0.8447],
            [Date.UTC(2015, 0, 8), 0.8480],
            [Date.UTC(2015, 0, 9), 0.8445],
            [Date.UTC(2015, 0, 11), 0.8425],
            [Date.UTC(2015, 0, 12), 0.8451],
            [Date.UTC(2015, 0, 13), 0.8495],
            [Date.UTC(2015, 0, 14), 0.8482],
            [Date.UTC(2015, 0, 15), 0.8598],
            [Date.UTC(2015, 0, 16), 0.8643],
            [Date.UTC(2015, 0, 18), 0.8648],
            [Date.UTC(2015, 0, 19), 0.8617],
            [Date.UTC(2015, 0, 20), 0.8658],
            [Date.UTC(2015, 0, 21), 0.8613],
            [Date.UTC(2015, 0, 22), 0.8798],
            [Date.UTC(2015, 0, 23), 0.8922],
            [Date.UTC(2015, 0, 25), 0.8990],
            [Date.UTC(2015, 0, 26), 0.8898],
            [Date.UTC(2015, 0, 27), 0.8787],
            [Date.UTC(2015, 0, 28), 0.8859],
            [Date.UTC(2015, 0, 29), 0.8834],
            [Date.UTC(2015, 0, 30), 0.8859],
            [Date.UTC(2015, 1, 1), 0.8843],
            [Date.UTC(2015, 1, 2), 0.8817],
            [Date.UTC(2015, 1, 3), 0.8710],
            [Date.UTC(2015, 1, 4), 0.8813],
            [Date.UTC(2015, 1, 5), 0.8713],
            [Date.UTC(2015, 1, 6), 0.8837],
            [Date.UTC(2015, 1, 8), 0.8839],
            [Date.UTC(2015, 1, 9), 0.8831],
            [Date.UTC(2015, 1, 10), 0.8833],
            [Date.UTC(2015, 1, 11), 0.8823],
            [Date.UTC(2015, 1, 12), 0.8770],
            [Date.UTC(2015, 1, 13), 0.8783],
            [Date.UTC(2015, 1, 15), 0.8774],
            [Date.UTC(2015, 1, 16), 0.8807],
            [Date.UTC(2015, 1, 17), 0.8762],
            [Date.UTC(2015, 1, 18), 0.8774],
            [Date.UTC(2015, 1, 19), 0.8798],
            [Date.UTC(2015, 1, 20), 0.8787],
            [Date.UTC(2015, 1, 22), 0.8787],
            [Date.UTC(2015, 1, 23), 0.8824],
            [Date.UTC(2015, 1, 24), 0.8818],
            [Date.UTC(2015, 1, 25), 0.8801],
            [Date.UTC(2015, 1, 26), 0.8931],
            [Date.UTC(2015, 1, 27), 0.8932],
            [Date.UTC(2015, 2, 1), 0.8960],
            [Date.UTC(2015, 2, 2), 0.8941],
            [Date.UTC(2015, 2, 3), 0.8948],
            [Date.UTC(2015, 2, 4), 0.9026],
            [Date.UTC(2015, 2, 5), 0.9066],
            [Date.UTC(2015, 2, 6), 0.9222],
            [Date.UTC(2015, 2, 8), 0.9221],
            [Date.UTC(2015, 2, 9), 0.9214],
            [Date.UTC(2015, 2, 10), 0.9347],
            [Date.UTC(2015, 2, 11), 0.9482],
            [Date.UTC(2015, 2, 12), 0.9403],
            [Date.UTC(2015, 2, 13), 0.9528],
            [Date.UTC(2015, 2, 15), 0.9541],
            [Date.UTC(2015, 2, 16), 0.9462],
            [Date.UTC(2015, 2, 17), 0.9435],
            [Date.UTC(2015, 2, 18), 0.9203],
            [Date.UTC(2015, 2, 19), 0.9381],
            [Date.UTC(2015, 2, 20), 0.9241],
            [Date.UTC(2015, 2, 22), 0.9237],
            [Date.UTC(2015, 2, 23), 0.9135],
            [Date.UTC(2015, 2, 24), 0.9152],
            [Date.UTC(2015, 2, 25), 0.9114],
            [Date.UTC(2015, 2, 26), 0.9188],
            [Date.UTC(2015, 2, 27), 0.9184],
            [Date.UTC(2015, 2, 29), 0.9188],
            [Date.UTC(2015, 2, 30), 0.9231],
            [Date.UTC(2015, 2, 31), 0.9319],
            [Date.UTC(2015, 3, 1), 0.9291],
            [Date.UTC(2015, 3, 2), 0.9188],
            [Date.UTC(2015, 3, 3), 0.9109],
            [Date.UTC(2015, 3, 5), 0.9091],
            [Date.UTC(2015, 3, 6), 0.9154],
            [Date.UTC(2015, 3, 7), 0.9246],
            [Date.UTC(2015, 3, 8), 0.9276],
            [Date.UTC(2015, 3, 9), 0.9382],
            [Date.UTC(2015, 3, 10), 0.9431],
            [Date.UTC(2015, 3, 12), 0.9426],
            [Date.UTC(2015, 3, 13), 0.9463],
            [Date.UTC(2015, 3, 14), 0.9386],
            [Date.UTC(2015, 3, 15), 0.9357],
            [Date.UTC(2015, 3, 16), 0.9293],
            [Date.UTC(2015, 3, 17), 0.9254],
            [Date.UTC(2015, 3, 19), 0.9251],
            [Date.UTC(2015, 3, 20), 0.9312],
            [Date.UTC(2015, 3, 21), 0.9315],
            [Date.UTC(2015, 3, 22), 0.9323],
            [Date.UTC(2015, 3, 23), 0.9236],
            [Date.UTC(2015, 3, 24), 0.9196],
            [Date.UTC(2015, 3, 26), 0.9201],
            [Date.UTC(2015, 3, 27), 0.9184],
            [Date.UTC(2015, 3, 28), 0.9106],
            [Date.UTC(2015, 3, 29), 0.8983],
            [Date.UTC(2015, 3, 30), 0.8909],
            [Date.UTC(2015, 4, 1), 0.8928],
            [Date.UTC(2015, 4, 3), 0.8941],
            [Date.UTC(2015, 4, 4), 0.8972],
            [Date.UTC(2015, 4, 5), 0.8940],
            [Date.UTC(2015, 4, 6), 0.8808],
            [Date.UTC(2015, 4, 7), 0.8876],
            [Date.UTC(2015, 4, 8), 0.8925],
            [Date.UTC(2015, 4, 10), 0.8934],
            [Date.UTC(2015, 4, 11), 0.8964],
            [Date.UTC(2015, 4, 12), 0.8917],
            [Date.UTC(2015, 4, 13), 0.8805],
            [Date.UTC(2015, 4, 14), 0.8764],
            [Date.UTC(2015, 4, 15), 0.8732],
            [Date.UTC(2015, 4, 17), 0.8737],
            [Date.UTC(2015, 4, 18), 0.8838],
            [Date.UTC(2015, 4, 19), 0.8969],
            [Date.UTC(2015, 4, 20), 0.9014],
            [Date.UTC(2015, 4, 21), 0.8999],
            [Date.UTC(2015, 4, 22), 0.9076],
            [Date.UTC(2015, 4, 24), 0.9098],
            [Date.UTC(2015, 4, 25), 0.9110],
            [Date.UTC(2015, 4, 26), 0.9196],
            [Date.UTC(2015, 4, 27), 0.9170],
            [Date.UTC(2015, 4, 28), 0.9133],
            [Date.UTC(2015, 4, 29), 0.9101],
            [Date.UTC(2015, 4, 31), 0.9126],
            [Date.UTC(2015, 5, 1), 0.9151],
            [Date.UTC(2015, 5, 2), 0.8965],
            [Date.UTC(2015, 5, 3), 0.8871],
            [Date.UTC(2015, 5, 4), 0.8898],
            [Date.UTC(2015, 5, 5), 0.8999],
            [Date.UTC(2015, 5, 7), 0.9004],
            [Date.UTC(2015, 5, 8), 0.8857],
            [Date.UTC(2015, 5, 9), 0.8862],
            [Date.UTC(2015, 5, 10), 0.8829],
            [Date.UTC(2015, 5, 11), 0.8882],
            [Date.UTC(2015, 5, 12), 0.8873],
            [Date.UTC(2015, 5, 14), 0.8913],
            [Date.UTC(2015, 5, 15), 0.8862],
            [Date.UTC(2015, 5, 16), 0.8891],
            [Date.UTC(2015, 5, 17), 0.8821],
            [Date.UTC(2015, 5, 18), 0.8802],
            [Date.UTC(2015, 5, 19), 0.8808],
            [Date.UTC(2015, 5, 21), 0.8794],
            [Date.UTC(2015, 5, 22), 0.8818],
            [Date.UTC(2015, 5, 23), 0.8952],
            [Date.UTC(2015, 5, 24), 0.8924],
            [Date.UTC(2015, 5, 25), 0.8925],
            [Date.UTC(2015, 5, 26), 0.8955],
            [Date.UTC(2015, 5, 28), 0.9113],
            [Date.UTC(2015, 5, 29), 0.8900],
            [Date.UTC(2015, 5, 30), 0.8950]
        ]
    }]
});

$(".bmpresultbtns").hide();
document.getElementById("bmpconfigreset").disabled = true;

document.getElementById('runmodel').addEventListener('click', function(evt) {
    $(".bmpsetupbtns").slideUp("slow", function() {
        $(".bmpresultbtns").show("slow");
    });
    document.getElementById('runmodel').disabled = true;
    document.getElementById("bmpconfigreset").disabled = false;

});

document.getElementById("bmpconfigreset").addEventListener("click", function() {
    $(".bmpresultbtns").hide();
    $(".bmpsetupbtns").show("slow");
    document.getElementById("bmpconfigreset").disabled = true;
    document.getElementById('runmodel').disabled = false;
    evaluationmap.getLayers().getArray()[3].setStyle(fieldStyle);
    document.getElementById("evaluationTable").innerHTML = `<tr>
                                <th style="padding-top:11px;">ID</th>
                                <th style="padding-top:11px;">CC</th>
                                <th style="padding-top:11px;">CT</th>
                                <th style="padding-top:11px;">NM</th>
                                <th style="padding-top:11px;">WasCobs</th>
                                <th style="padding-top:11px;">Del</th>
                            </tr>`;
});



// document.addEventListener("click", function(evt) {
//     if (hasClass(evt.target, 'optimizationtype') || hasClass(evt.target, 'bmpbtn') || hasClass(evt.target, 'resultbtn') || hasClass(evt.target, 'layertype')) {
//         var siblings = evt.target.parentNode.childNodes;
//         for (i = 0; i < siblings.length; i++) {
//             siblings[i].disabled = false;
//         }
//         evt.target.disabled = true;
//     }
// });

// function hasClass(elem, klass) {
//     return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
// }


// create list of node connections
var connections = [{
    "source": "alpha",
    "target": "beta"
}, {
    "source": "alpha",
    "target": "gamma"
}, {
    "source": "beta",
    "target": "delta"
}, {
    "source": "beta",
    "target": "epsilon"
}, {
    "source": "zeta",
    "target": "gamma"
}, {
    "source": "theta",
    "target": "gamma"
}, {
    "source": "eta",
    "target": "gamma"
}];
// instantiate d3plus
var visualization = d3plus.viz()
    .container("#socialnetwork") // container DIV to hold the visualization
    .type("rings") // visualization type
    .edges(connections) // list of node connections
    .focus("alpha") // ID of the initial center node
    .draw(); // finally, draw the visualization!



// ==============================================================================================================================
// ========================================MAP OPERATION=============================================
// ==============================================================================================================================
var fieldArray = [];
var subbasinArray = [];

function Subbasin(id, feature, flow, sediment, tn, tp) {
    this.id = id;
    this.feature = feature;
    this.flow = flow;
    this.sediment = sediment;
    this.tn = tn;
    this.tp = tp;
}

function Field(id, feature, flow, sediment, tn, tp) {
    this.id = id;
    this.feature = feature;
    this.flow = flow;
    this.sediment = sediment;
    this.tn = tn;
    this.tp = tp;
}

// ****************************************************
// Subbasin layer loaded from geoserver in Jsonp format
// Be sure to enable the Jsonp function in the web.xml
// of Geoserver 
// ****************************************************

var subbasinStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(17,34,68,0.6)'
    }),
    stroke: new ol.style.Stroke({
        color: 'white'
    })
});

var subbasinJsonp = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/static/administration/assets/layers/basin.json',
        format: new ol.format.GeoJSON()
    }),
    style: subbasinStyle
});

subbasinJsonp.getSource().on('addfeature', function(event) {
    subbasinFeatures = subbasinJsonp.getSource().getFeatures();
    for (i = 0; i < subbasinFeatures.length; i++) {
        var subbasin = new Subbasin();
        subbasin.id = subbasinFeatures[i].getProperties().Name;
        subbasin.feature = subbasinFeatures[i];
        subbasinArray.push(subbasin);
    }
});

// ****************************************************
// Field layer loaded from geoserver in Jsonp format
// Be sure to enable the Jsonp function in the web.xml
// of Geoserver     
// ****************************************************

var fieldStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(87,178,47,0.6)'
    }),
    stroke: new ol.style.Stroke({
        color: 'white'
    })
});

var fieldJsonp = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/static/administration/assets/layers/field.json',
        format: new ol.format.GeoJSON()
    }),
    style: fieldStyle
});


var fieldJsonp2 = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/static/administration/assets/layers/field.json',
        format: new ol.format.GeoJSON()
    }),
    style: fieldStyle
});

fieldJsonp.getSource().on('addfeature', function(event) {
    fieldFeatures = fieldJsonp.getSource().getFeatures();
    for (i = 0; i < fieldFeatures.length; i++) {
        var field = new Field();
        field.id = fieldFeatures[i].getProperties().Name;
        field.feature = fieldFeatures[i];
        fieldArray.push(field);
    }
});

// ****************************************************
// Outlet layer loaded from geoserver in Jsonp format
// Be sure to enable the Jsonp function in the web.xml
// of Geoserver     
// ****************************************************

var outletDefaultStyle = new ol.style.Style({
    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [247, 161, 49, 1]
        }),
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 1
        }),
        radius: 5
    }),
    fill: new ol.style.Fill({
        color: [247, 161, 49, 1]
    }),
    stroke: new ol.style.Stroke({
        color: 'white',
        width: 1
    })
});

var outletSelectStyle = [
    new ol.style.Style({
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: [247, 161, 49, 1]
            }),
            stroke: new ol.style.Stroke({
                color: [230, 230, 100, 1],
                width: 1
            }),
            radius: 10
        }),
        fill: new ol.style.Fill({
            color: [247, 161, 49, 1]
        }),
        stroke: new ol.style.Stroke({
            color: [230, 230, 100, 1],
            width: 2
        })
    }),
    new ol.style.Style({
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: [247, 161, 49, 1]
            }),
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 5
            }),
            radius: 10
        }),
        fill: new ol.style.Fill({
            color: [247, 161, 49, 1]
        }),
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 5
        })
    })
];

var outlet = new ol.Feature({});
var point_geom = new ol.geom.Point(
    ol.proj.transform([-81.7132830619812, 43.61527726000183], 'EPSG:4326', 'EPSG:3857')
);
outlet.setGeometry(point_geom);

var outletLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [outlet]
    }),
    zIndex: 10
});

outletLayer.setStyle(outletDefaultStyle);
// ****************************************************
// Style functions  
// ****************************************************

var Great = 'rgba(53, 191, 0, 0.6)';
var Good = 'rgba(115, 197, 0, 0.6)';
var Normal = 'rgba(181, 203, 0, 0.6)';
var Slight = 'rgba(210, 168, 0, 0.6)';
var Bad = 'rgba(216, 170, 0, 0.6)';
var Severe = 'rgba(229, 0, 26, 0.6)';

var SeverityLevel = {
    "Great": Great,
    "Good": Good,
    "Normal": Normal,
    "Slight": Slight,
    "Bad": Bad,
    "Severe": Severe
};

var defaultStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: [250, 250, 250, 0.6]
    }),
    stroke: new ol.style.Stroke({
        color: [220, 220, 220, 1],
        width: 1
    })
});

var styleCache = {};

function styleSedimentFunction(feature, resolution) {
    var properties = feature.getProperties();
    var level = feature.getProperties().sedimentlevel;
    if (!level || !SeverityLevel[level]) {
        return [defaultStyle];
    }
    if (!styleCache[level]) {
        styleCache[level] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: SeverityLevel[level]
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        });
    }
    return [styleCache[level]];
}

function styleFlowFunction(feature, resolution) {
    var properties = feature.getProperties();
    var level = feature.getProperties().flowlevel;
    if (!level || !SeverityLevel[level]) {
        return [defaultStyle];
    }
    if (!styleCache[level]) {
        styleCache[level] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: SeverityLevel[level]
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        });
    }
    return [styleCache[level]];
}

function styleTpFunction(feature, resolution) {
    var properties = feature.getProperties();
    var level = feature.getProperties().tplevel;
    if (!level || !SeverityLevel[level]) {
        return [defaultStyle];
    }
    if (!styleCache[level]) {
        styleCache[level] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: SeverityLevel[level]
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        });
    }
    return [styleCache[level]];
}

function styleTnFunction(feature, resolution) {
    var properties = feature.getProperties();
    var level = feature.getProperties().tnlevel;
    if (!level || !SeverityLevel[level]) {
        return [defaultStyle];
    }
    if (!styleCache[level]) {
        styleCache[level] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: SeverityLevel[level]
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        });
    }
    return [styleCache[level]];
}

function styleCostFunction(feature, resolution) {
    var properties = feature.getProperties();
    var level = feature.getProperties().costlevel;
    if (!level || !SeverityLevel[level]) {
        return [defaultStyle];
    }
    if (!styleCache[level]) {
        styleCache[level] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: SeverityLevel[level]
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        });
    }
    return [styleCache[level]];
}

function styleRevenueFunction(feature, resolution) {
    var properties = feature.getProperties();
    var level = feature.getProperties().revenuelevel;
    if (!level || !SeverityLevel[level]) {
        return [defaultStyle];
    }
    if (!styleCache[level]) {
        styleCache[level] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: SeverityLevel[level]
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        });
    }
    return [styleCache[level]];
}

function styleNetReturnFunction(feature, resolution) {
    var properties = feature.getProperties();
    var level = feature.getProperties().netreturnlevel;
    if (!level || !SeverityLevel[level]) {
        return [defaultStyle];
    }
    if (!styleCache[level]) {
        styleCache[level] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: SeverityLevel[level]
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        });
    }
    return [styleCache[level]];
}

function optStyleSedimentFunction(feature, resolution) {
    var properties = feature.getProperties();
    var value = feature.getProperties().sediment;
    if (value !== 0) {
        var level = feature.getProperties().sedimentlevel;
        if (!level || !SeverityLevel[level]) {
            return [fieldStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: SeverityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    } else {
        return fieldStyle;
    }
}

function optStyleFlowFunction(feature, resolution) {
    var properties = feature.getProperties();
    var value = feature.getProperties().flow;
    if (value !== 0) {
        var level = feature.getProperties().flowlevel;
        if (!level || !SeverityLevel[level]) {
            return [fieldStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: SeverityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    } else {
        return fieldStyle;
    }
}

function optStyleTpFunction(feature, resolution) {
    var properties = feature.getProperties();
    var value = feature.getProperties().tp;
    if (value !== 0) {
        var level = feature.getProperties().tplevel;
        if (!level || !SeverityLevel[level]) {
            return [fieldStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: SeverityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    } else {
        return fieldStyle;
    }
}

function optStyleTnFunction(feature, resolution) {
    var properties = feature.getProperties();
    var value = feature.getProperties().tn;
    if (value !== 0) {
        var level = feature.getProperties().tnlevel;
        if (!level || !SeverityLevel[level]) {
            return [fieldStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: SeverityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    } else {
        return fieldStyle;
    }
}
// ****************************************************
// the select interaction allows us to select features 
// through two methods: hover and single click.  
// ****************************************************

var selectPointerMove = new ol.interaction.Select({
    layers: [fieldJsonp, outletLayer, subbasinJsonp],
    condition: ol.events.condition.pointerMove,
    filter: function(feature, layer) {
        if (layer === fieldJsonp) {
            if (feature.getProperties().Name > 600) {
                return false;
            }
            return true;
        }
        return true;
    },
});

var selectSingleClick = new ol.interaction.Select({
    layers: [fieldJsonp, outletLayer, subbasinJsonp],
    filter: function(feature, layer) {
        if (layer === fieldJsonp) {
            if (feature.getProperties().Name > 600) {
                return false;
            }
            return true;
        }
        return true;
    },
});

var selectPointerMove2 = new ol.interaction.Select({
    layers: [fieldJsonp2],
    condition: ol.events.condition.pointerMove,
    filter: function(feature, layer) {
        if (layer === fieldJsonp2) {
            if (feature.getProperties().Name > 600) {
                return false;
            }
            return true;
        }
        return true;
    },
});

var selectSingleClick2 = new ol.interaction.Select({
    layers: [fieldJsonp2],
    filter: function(feature, layer) {
        if (layer === fieldJsonp2) {
            if (feature.getProperties().Name > 600) {
                return false;
            }
            return true;
        }
        return true;
    },
});

var source = new ol.source.Vector({ wrapX: false });

var vector = new ol.layer.Vector({
    source: source
});

var draw = new ol.interaction.Draw({
    source: source,
    type: /** @type {ol.geom.GeometryType} */ ('Polygon'),
    freehand: true
});


var selectedStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(242,146,52,0.6)'
    }),
    stroke: new ol.style.Stroke({
        color: 'white'
    })
});

selectSingleClick.on('select', function(event) {
    // $(element).hide();
    selectedFeature = event.selected[0];
    if (selectedFeature) {
        selectedFeature.setStyle(selectedStyle);
        var id = selectedFeature.getProperties().Name;
        if (fieldBMPAssignment[id] === undefined) {
            fieldBMPAssignment[id] = {
                cc: 'N',
                ct: 'N',
                nm: 'N',
            };
        }
        if (document.getElementsByClassName('bmpbtn')[0].disabled === true) {
            fieldBMPAssignment[id].ct = 'Y';
        }
        if (document.getElementsByClassName('bmpbtn')[1].disabled === true) {
            fieldBMPAssignment[id].cc = 'Y';
        }
        if (document.getElementsByClassName('bmpbtn')[2].disabled === true) {
            fieldBMPAssignment[id].nm = 'Y';
        }

        var selectedFeatureID = document.getElementsByClassName("selectedFeatureID");
        for (var i = 0; i < selectedFeatureID.length; i++) {
            console.log(selectedFeatureID[i].innerText);
            if (selectedFeatureID[i].innerText == id.toString()) {
                document.getElementById("evaluationTable").deleteRow(selectedFeatureID[i].parentNode.rowIndex);
            }
        }
        $('#evaluationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedFeatureID">' +
            id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
            fieldBMPAssignment[id].cc + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
            fieldBMPAssignment[id].ct + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
            fieldBMPAssignment[id].nm + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
            'N' + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');

    }
});

var optimizationFeatureList = [];

selectSingleClick2.on('select', function(event) {
    // $(element).hide();
    selectedFeature = event.selected[0];
    if (selectedFeature) {
        var exist = false;
        selectedFeature.setStyle(selectedStyle);
        var id = selectedFeature.getProperties().Name;
        // alert(optimizationFeatureList.length);
        // alert(typeof id);
        for (j = 0; j < optimizationFeatureList.length; j++) {
            if (optimizationFeatureList[j] == id) {
                exist = true;
            }
        }
        if (exist === false) {
            $('#optmizationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedOptFeatureID">' +
                id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                '' + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                '' + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                '' + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                '' + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');
            optimizationFeatureList.push(id);
        }
    }
});

var element = document.getElementById('feature-info');

var infoOverlay = new ol.Overlay({
    element: document.getElementById('feature-info'),
    positioning: 'bottom-center',
    stopEvent: false
});

var element2 = document.getElementById('opt-feature-info');

var infoOverlay2 = new ol.Overlay({
    element: document.getElementById('opt-feature-info'),
    positioning: 'bottom-center',
    stopEvent: false
});

selectPointerMove.on('select', function(event) {
    hoveredFeature = event.selected[0];
    if (hoveredFeature) {
        var coordinate = ol.extent.getCenter(hoveredFeature.getGeometry().getExtent());
        var offsetCoordinate = [coordinate[0], coordinate[1] + 500];
        infoOverlay.setPosition(offsetCoordinate);
        $(element).html("FeatureID: " + hoveredFeature.getProperties().Name);
        $(element).show();
        infoOverlay.setPosition(offsetCoordinate);
    } else {
        $(element).hide();
    }
});
selectPointerMove2.on('select', function(event) {
    hoveredFeature = event.selected[0];
    if (hoveredFeature) {
        var coordinate = ol.extent.getCenter(hoveredFeature.getGeometry().getExtent());
        var offsetCoordinate = [coordinate[0], coordinate[1] + 500];
        infoOverlay2.setPosition(offsetCoordinate);
        $(element2).html("FeatureID: " + hoveredFeature.getProperties().Name);
        $(element2).show();
        infoOverlay2.setPosition(offsetCoordinate);
    } else {
        $(element2).hide();
    }
});

/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;

app.FeatureSelectionModeControl = function(opt_options) {

    var options = opt_options || {};

    var singleSelectionBtn = document.createElement('button');
    singleSelectionBtn.innerHTML = 'S';
    var multiSelectionBtn = document.createElement('button');
    multiSelectionBtn.innerHTML = 'M';
    var mapResetBtn = document.createElement('button');
    mapResetBtn.innerHTML = 'R';

    singleSelectionBtn.addEventListener('click', function() {
        evaluationmap.removeInteraction(draw);
        evaluationmap.addInteraction(selectSingleClick);
    }, false);
    multiSelectionBtn.addEventListener('click', function() {
        evaluationmap.removeInteraction(selectSingleClick);
        evaluationmap.addInteraction(draw);
    }, false);
    mapResetBtn.addEventListener('click', function() {
        evaluationmap.getView().setCenter(ol.proj.transform([-81.6555, 43.614], 'EPSG:4326', 'EPSG:3857'));
        evaluationmap.getView().setZoom(13);
    }, false);

    var element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(singleSelectionBtn);
    element.appendChild(multiSelectionBtn);
    element.appendChild(mapResetBtn);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(app.FeatureSelectionModeControl, ol.control.Control);

var evaluationmap = new ol.Map({
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }).extend([
        new app.FeatureSelectionModeControl()
    ]),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }), outletLayer, vector, fieldJsonp,
    ],
    target: 'evaluationmap',
    view: new ol.View({
        center: ol.proj.transform([-81.6555, 43.614], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13,
    })
});

evaluationmap.addOverlay(infoOverlay);
evaluationmap.addInteraction(selectSingleClick);
evaluationmap.addInteraction(selectPointerMove);

var source2 = new ol.source.Vector({ wrapX: false });

var vector2 = new ol.layer.Vector({
    source: source2
});

var draw2 = new ol.interaction.Draw({
    source: source2,
    type: /** @type {ol.geom.GeometryType} */ ('Polygon'),
    freehand: true
});


app.FeatureSelectionModeControl2 = function(opt_options) {

    var options = opt_options || {};

    var singleSelectionBtn = document.createElement('button');
    singleSelectionBtn.innerHTML = 'S';
    var multiSelectionBtn = document.createElement('button');
    multiSelectionBtn.innerHTML = 'M';
    var mapResetBtn = document.createElement('button');
    mapResetBtn.innerHTML = 'R';

    singleSelectionBtn.addEventListener('click', function() {
        optimizationmap.removeInteraction(draw2);
        optimizationmap.addInteraction(selectSingleClick2);
    }, false);
    multiSelectionBtn.addEventListener('click', function() {
        optimizationmap.removeInteraction(selectSingleClick2);
        optimizationmap.addInteraction(draw2);
    }, false);
    mapResetBtn.addEventListener('click', function() {
        optimizationmap.getView().setCenter(ol.proj.transform([-81.6555, 43.614], 'EPSG:4326', 'EPSG:3857'));
        optimizationmap.getView().setZoom(13);
    }, false);

    var element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(singleSelectionBtn);
    element.appendChild(multiSelectionBtn);
    element.appendChild(mapResetBtn);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(app.FeatureSelectionModeControl2, ol.control.Control);

var optimizationmap = new ol.Map({
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }).extend([
        new app.FeatureSelectionModeControl2()
    ]),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }), vector2, fieldJsonp2,
    ],
    target: 'optimizationmap',
    view: new ol.View({
        center: ol.proj.transform([-81.6555, 43.614], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13,
    })
});

optimizationmap.addOverlay(infoOverlay2);
optimizationmap.addInteraction(selectSingleClick2);
optimizationmap.addInteraction(selectPointerMove2);

var fieldBMPAssignment = [];
var subbasinBMPAssignment = [];

source.on('addfeature', function(evt) {
    var feature = evt.feature;
    var coords = feature.getGeometry().getCoordinates();
    console.log(coords);
    fieldJsonp.getSource().forEachFeatureIntersectingExtent(feature.getGeometry().getExtent(), function(feature) {
        if (feature.getProperties().Name < 600) {

            console.log("hi");
            console.log(feature.getProperties().Name);
            feature.setStyle(selectedStyle);
            var id = feature.getProperties().Name;

            if (fieldBMPAssignment[id] === undefined) {

                fieldBMPAssignment[id] = {
                    cc: 'N',
                    ct: 'N',
                    nm: 'N',
                };
            }

            if (document.getElementsByClassName('bmpbtn')[0].disabled === true) {
                fieldBMPAssignment[id].ct = 'Y';
            }
            if (document.getElementsByClassName('bmpbtn')[1].disabled === true) {
                fieldBMPAssignment[id].cc = 'Y';
            }
            if (document.getElementsByClassName('bmpbtn')[2].disabled === true) {
                fieldBMPAssignment[id].nm = 'Y';
            }

            var selectedFeatureID = document.getElementsByClassName("selectedFeatureID");
            for (var i = 0; i < selectedFeatureID.length; i++) {
                console.log(selectedFeatureID[i].innerText);
                if (selectedFeatureID[i].innerText == id.toString()) {
                    document.getElementById("evaluationTable").deleteRow(selectedFeatureID[i].parentNode.rowIndex);
                }
            }
            $('#evaluationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedFeatureID">' +
                id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].cc + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].ct + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].nm + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                'N' + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');
        }

    });
    source.clear();
});

source2.on('addfeature', function(evt) {
    var feature = evt.feature;
    var coords = feature.getGeometry().getCoordinates();
    console.log(coords);
    var a = optimizationmap.getLayers().getArray()[2];
    a.getSource().forEachFeatureIntersectingExtent(feature.getGeometry().getExtent(), function(feature) {
        if (feature.getProperties().Name < 600) {
            var exist = false;
            console.log("hi");
            console.log(feature.getProperties().Name);
            feature.setStyle(selectedStyle);
            var id = feature.getProperties().Name;
            for (j = 0; j < optimizationFeatureList.length; j++) {
                if (optimizationFeatureList[j] == id) {
                    exist = true;
                }
            }
            if (exist === false) {
                optimizationFeatureList.push(id);
                $('#optmizationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedOptFeatureID">' +
                    id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    " " + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    " " + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    " " + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    ' ' + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');
            }

        }

    });
    source2.clear();
    console.log(optimizationFeatureList.length);
});

document.getElementById("ct").addEventListener('click', function(event) {
    selectSingleClick.getFeatures().clear();
    // alert("hello");
    for (var i = 0; i < fieldArray.length; i++) {
        fieldArray[i].feature.setStyle(null);
    }

    for (var j in fieldBMPAssignment) {
        console.log(j);
        if (fieldBMPAssignment[j].ct == "Y") {
            for (var z = 0; z < fieldArray.length; z++) {
                if (fieldArray[z].id === j) {
                    fieldArray[z].feature.setStyle(selectedStyle);
                }
            }
        }
    }
    var siblings = event.target.parentNode.childNodes;
    for (i = 0; i < siblings.length; i++) {
        siblings[i].disabled = false;
    }
    event.target.disabled = true;
});

document.getElementById("cc").addEventListener('click', function(event) {
    selectSingleClick.getFeatures().clear();
    for (var i = 0; i < fieldArray.length; i++) {
        fieldArray[i].feature.setStyle(null);
    }

    for (var j in fieldBMPAssignment) {
        console.log(j);
        if (fieldBMPAssignment[j].cc == "Y") {
            for (var z = 0; z < fieldArray.length; z++) {
                if (fieldArray[z].id === j) {
                    fieldArray[z].feature.setStyle(selectedStyle);
                }
            }
        }
    }

    var siblings = event.target.parentNode.childNodes;
    for (i = 0; i < siblings.length; i++) {
        siblings[i].disabled = false;
    }
    event.target.disabled = true;
});

document.getElementById("nm").addEventListener('click', function(event) {
    selectSingleClick.getFeatures().clear();
    for (var i = 0; i < fieldArray.length; i++) {
        fieldArray[i].feature.setStyle(null);
    }

    for (var j in fieldBMPAssignment) {
        console.log(j);
        if (fieldBMPAssignment[j].nm == "Y") {
            for (var z = 0; z < fieldArray.length; z++) {
                if (fieldArray[z].id === j) {
                    fieldArray[z].feature.setStyle(selectedStyle);
                }
            }
        }
    }

    var siblings = event.target.parentNode.childNodes;
    for (i = 0; i < siblings.length; i++) {
        siblings[i].disabled = false;
    }
    event.target.disabled = true;
});

document.getElementById("clearselection").addEventListener("click", function(event) {
    for (var i = 0; i < fieldArray.length; i++) {
        fieldArray[i].feature.setStyle(null);
    }
    fieldBMPAssignment.length = 0;
    document.getElementById("evaluationTable").innerHTML = `<tr>
                                <th style="padding-top:11px;">ID</th>
                                <th style="padding-top:11px;">CC</th>
                                <th style="padding-top:11px;">CT</th>
                                <th style="padding-top:11px;">NM</th>
                                <th style="padding-top:11px;">WasCobs</th>
                                <th style="padding-top:11px;">Del</th>
                            </tr>`;
});

$("#evaluationTable").on("click", "td.deleteSelectedFeature", function() {
    $(this).closest('tr').remove();
    var id = $(this).siblings(":first").text();
    for (var i = 0; i < fieldArray.length; i++) {
        if (fieldArray[i].id === id) {
            fieldArray[i].feature.setStyle(null);
        }
    }
    selectSingleClick.getFeatures().clear();
    fieldBMPAssignment.splice(id, 1);
});

$(document).on('show-loading-page', function() {

    $("#loading-page").css("visibility", "visible");
    var fadeoutBox = $("#box1");
    var fadeinBox = $("#box2");
    var nextfadeinBox = $("#box3");
    var lastfadeinBox = $("#box4");
    var finalfadeinBox = $("#box5");
    var thetruefinalfadeinBox = $("#box6");


    setTimeout(function fade() {
        fadeinBox.stop(true, true).fadeIn(1500);
        fadeoutBox.stop(true, true).fadeOut(1500, function() {
            var temp = fadeinBox;
            fadeinBox = nextfadeinBox;
            nextfadeinBox = lastfadeinBox;
            lastfadeinBox = thetruefinalfadeinBox;
            thetruefinalfadeinBox = finalfadeinBox;
            finalfadeinBox = fadeoutBox;
            fadeoutBox = temp;
            setTimeout(fade, 10000);
        });
    }, 10000);
});

$(document).on('show-loading-page2', function() {

    $("#loading-page2").css("visibility", "visible");
    var fadeoutBox = $("#box7");

});

var bmpAssignmentArray = [];

$("#runmodel").click(function(event) {

    $(document).trigger('show-loading-page');
    bmpAssignmentArray.length = 0;

    $('#evaluationTable .selectedFeatureID').each(function(index, el) {
        var bmpAssignment = new Object();
        bmpAssignment.featureID = parseInt($(this).text());
        var cc, ct, nm, wascob;
        cc = $(this).next().text();
        ct = $(this).next().next().text();
        nm = $(this).next().next().next().text();
        wascob = $(this).next().next().next().next().text();
        if (cc === 'Y' && nm === 'Y' && ct === 'Y') {
            bmpAssignment.bmpCode = 9;
        } else if (cc === 'N' && nm === 'Y' && ct === 'Y') {
            bmpAssignment.bmpCode = 6;
        } else if (cc === 'Y' && nm === 'N' && ct === 'Y') {
            bmpAssignment.bmpCode = 7;
        } else if (cc === 'Y' && nm === 'Y' && ct === 'N') {
            bmpAssignment.bmpCode = 8;
        } else if (cc === 'N' && nm === 'N' && ct === 'Y') {
            bmpAssignment.bmpCode = 3;
        } else if (cc === 'N' && nm === 'Y' && ct === 'N') {
            bmpAssignment.bmpCode = 4;
        } else if (cc === 'Y' && nm === 'N' && ct === 'N') {
            bmpAssignment.bmpCode = 5;
        } else bmpAssignment.bmpCode = null;
        bmpAssignment.featureType = "field";
        bmpAssignment.wascob = wascob;
        // bmpAssignment.config = $("#bmp-select-table").html();
        bmpAssignmentArray.push(bmpAssignment);
    });


    var jsonArray = JSON.stringify(bmpAssignmentArray);
    $.ajax({
        url: '/runmodel',
        type: "post",
        contentType: 'application/json; charset=utf-8',
        data: jsonArray,
        dataType: 'json',
        success: function(r) {
            var b = evaluationmap.getLayers().getArray()[1];
            b.setStyle(outletSelectStyle);

            outletSediment = r[0].ResultData;
            outletFlow = r[1].ResultData;
            outletTp = r[2].ResultData;
            outletTn = r[3].ResultData;

            outletSedimentAverage = 0;
            outletFlowAverage = 0;
            outletTpAverage = 0;
            outletTnAverage = 0;

            for (var i = 0; i < outletSediment.length; i++) {
                outletSedimentAverage = outletSedimentAverage + outletSediment[i];
                outletFlowAverage = outletFlowAverage + outletFlow[i];
                outletTpAverage = outletTpAverage + outletTp[i];
                outletTnAverage = outletTnAverage + outletTn[i];
            }

            outletSedimentAverage = outletSedimentAverage / 10;
            outletFlowAverage = outletFlowAverage / 10;
            outletTpAverage = outletTpAverage / 10;
            outletTnAverage = outletTnAverage / 10;


            outlet.setProperties({
                'sediment': outletSedimentAverage,
                'flow': outletFlowAverage,
                'tp': outletTpAverage,
                'tn': outletTnAverage,
                'name': 'outlet'
            });

            evaluationmap.removeLayer(evaluationmap.getLayers().getArray()[3]);

            fieldJsonp = new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: '/static/administration/assets/layers/fieldOutput.json',
                    format: new ol.format.GeoJSON()
                }),
                style: styleFlowFunction
            });
            evaluationmap.addLayer(fieldJsonp);

            evaluationmap.removeInteraction(selectPointerMove);
            selectPointerMove = new ol.interaction.Select({
                layers: [fieldJsonp, outletLayer],
                condition: ol.events.condition.pointerMove,
                filter: function(feature, layer) {
                    if (layer === fieldJsonp) {
                        if (feature.getProperties().name > 600 && ($('#cost').prop("disabled") || $('#revenue').prop("disabled") || $('#netreturn').prop("disabled"))) {
                            return false;
                        }
                        return true;
                    }
                    return true;
                },
            });

            evaluationmap.removeInteraction(selectSingleClick);
            selectSingleClick = new ol.interaction.Select({
                layers: [fieldJsonp, outletLayer],
                filter: function(feature, layer) {
                    if (layer === fieldJsonp) {
                        if (feature.getProperties().name > 600 && ($('#cost').prop("disabled") || $('#revenue').prop("disabled") || $('#netreturn').prop("disabled"))) {
                            return false;
                        }
                        return true;
                    }
                    return true;
                },
            });

            $('#flow').attr("disabled", true);
            $('#flow').siblings().attr("disabled", false);

            selectSingleClick.on('select', function(event) {
                // $(element).hide();
                var selectedFeature = event.selected[0];
                if (selectedFeature) {
                    if (document.getElementById("runmodel").disabled === false) {
                        var id = selectedFeature.getProperties().Name;
                        if (fieldBMPAssignment[id] === undefined) {
                            fieldBMPAssignment[id] = {
                                cc: 'N',
                                ct: 'N',
                                nm: 'N',
                            };
                        }
                        if (document.getElementsByClassName('bmpbtn')[0].disabled === true) {
                            fieldBMPAssignment[id].ct = 'Y';
                        }
                        if (document.getElementsByClassName('bmpbtn')[1].disabled === true) {
                            fieldBMPAssignment[id].cc = 'Y';
                        }
                        if (document.getElementsByClassName('bmpbtn')[2].disabled === true) {
                            fieldBMPAssignment[id].nm = 'Y';
                        }

                        var selectedFeatureID = document.getElementsByClassName("selectedFeatureID");
                        for (var i = 0; i < selectedFeatureID.length; i++) {
                            console.log(selectedFeatureID[i].innerText);
                            if (selectedFeatureID[i].innerText == id.toString()) {
                                document.getElementById("evaluationTable").deleteRow(selectedFeatureID[i].parentNode.rowIndex);
                            }
                        }
                        $('#evaluationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedFeatureID">' +
                            id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                            fieldBMPAssignment[id].cc + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                            fieldBMPAssignment[id].ct + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                            fieldBMPAssignment[id].nm + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                            'N' + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');
                    } else {
                        var b = evaluationmap.getLayers().getArray()[1];
                        b.setStyle(outletDefaultStyle);
                        drawFeatureChart(selectedFeature);
                    }
                } else {
                    var a = evaluationmap.getLayers().getArray()[1];
                    a.setStyle(outletSelectStyle);
                    selectSingleClick.getFeatures().clear();
                    if ($('#flow').prop("disabled") === true) {
                        drawOutletChart("flow");
                    }
                    if ($('#sediment').prop("disabled") === true) {
                        drawOutletChart("sediment");
                    }
                    if ($('#tn').prop("disabled") === true) {
                        drawOutletChart("tn");
                    }
                    if ($('#tp').prop("disabled") === true) {
                        drawOutletChart("tp");
                    }
                    if ($('#cost').prop("disabled") === true) {
                        drawOutletChart("cost");
                    }
                    if ($('#revenue').prop("disabled") === true) {
                        drawOutletChart("revenue");
                    }
                    if ($('#netreturn').prop("disabled") === true) {
                        drawOutletChart("netreturn");
                    }
                }
            });

            selectPointerMove.on('select', function(event) {
                var hoveredResultFeature = event.selected[0];
                var num;
                if (hoveredResultFeature) {
                    var coordinate = ol.extent.getCenter(hoveredResultFeature.getGeometry().getExtent());
                    var offsetCoordinate = [coordinate[0], coordinate[1] + 500];
                    infoOverlay.setPosition(offsetCoordinate);
                    if ($('#flow').prop("disabled") === true) {
                        num = hoveredResultFeature.getProperties().flow;
                        num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                        $(element).html("FeatureID: " + hoveredResultFeature.getProperties().name + "<br />" + "Flow " + num + "mm/ha/year");
                        $(element).show();
                        infoOverlay.setPosition(offsetCoordinate);
                    }
                    if ($('#sediment').prop("disabled") === true) {
                        num = hoveredResultFeature.getProperties().sediment;
                        num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                        $(element).html("FeatureID: " + hoveredResultFeature.getProperties().name + "<br />" + "Sediment " + num + " ton/ha/year");
                        $(element).show();
                        infoOverlay.setPosition(offsetCoordinate);
                    }
                    if ($('#tn').prop("disabled") === true) {
                        num = hoveredResultFeature.getProperties().tn;
                        num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                        $(element).html("FeatureID: " + hoveredResultFeature.getProperties().name + "<br />" + "Total N " + num + " kg/ha/year");
                        $(element).show();
                        infoOverlay.setPosition(offsetCoordinate);
                    }
                    if ($('#tp').prop("disabled") === true) {
                        num = hoveredResultFeature.getProperties().tp;
                        num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                        $(element).html("FeatureID: " + hoveredResultFeature.getProperties().name + "<br />" + "Total P " + num + " kg/ha/year");

                        $(element).show();
                        infoOverlay.setPosition(offsetCoordinate);
                    }

                    if ($('#cost').prop("disabled") === true) {
                        if (hoveredResultFeature.getProperties().name < 600 || hoveredResultFeature.getProperties().name == "outlet") {
                            num = hoveredResultFeature.getProperties().cost;
                            num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                            $(element).html("FeatureID: " + hoveredResultFeature.getProperties().name + "<br />" + "Cost " + num + " dollar");
                            $(element).show();
                            infoOverlay.setPosition(offsetCoordinate);
                        } else {
                            $(element).hide();
                        }
                    }
                    if ($('#netreturn').prop("disabled") === true) {
                        if (hoveredResultFeature.getProperties().name < 600 || hoveredResultFeature.getProperties().name == "outlet") {
                            num = hoveredResultFeature.getProperties().netreturn;
                            num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                            $(element).html("FeatureID: " + hoveredResultFeature.getProperties().name + "<br />" + "NetReturn " + num + " dollar");
                            $(element).show();
                            infoOverlay.setPosition(offsetCoordinate);
                        } else {
                            $(element).hide();
                        }
                    }
                    if ($('#revenue').prop("disabled") === true) {
                        if (hoveredResultFeature.getProperties().name < 600 || hoveredResultFeature.getProperties().name == "outlet") {
                            num = hoveredResultFeature.getProperties().revenue;
                            num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                            $(element).html("FeatureID: " + hoveredResultFeature.getProperties().name + "<br />" + "Revenue " + num + " dollar");
                            $(element).show();
                            infoOverlay.setPosition(offsetCoordinate);
                        } else {
                            $(element).hide();
                        }
                    }
                } else {
                    $(element).hide();
                }
            });

            evaluationmap.addInteraction(selectSingleClick);
            evaluationmap.addInteraction(selectPointerMove);

            drawOutletChart("flow");
            $("#loading-page").css("visibility", "hidden");
        }
    });
});

$("#flow").click(function(event) {
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[3];
    a.setStyle(styleFlowFunction);
    var b = evaluationmap.getLayers().getArray()[1];
    b.setStyle(outletSelectStyle);
    drawOutletChart("flow");
    $("#flow").attr("disabled", true);
    $("#flow").siblings().attr("disabled", false);

});
$("#sediment").click(function(event) {
    /* Act on the event */
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[3];
    a.setStyle(styleSedimentFunction);
    var b = evaluationmap.getLayers().getArray()[1];
    b.setStyle(outletSelectStyle);
    drawOutletChart("sediment");
    $("#sediment").attr("disabled", true);
    $("#sediment").siblings().attr("disabled", false);
});
$("#tn").click(function(event) {
    /* Act on the event */
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[3];
    a.setStyle(styleTnFunction);
    var b = evaluationmap.getLayers().getArray()[1];
    b.setStyle(outletSelectStyle);
    drawOutletChart("tn");
    $("#tn").attr("disabled", true);
    $("#tn").siblings().attr("disabled", false);
});
$("#tp").click(function(event) {
    /* Act on the event */
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[3];
    a.setStyle(styleTpFunction);
    var b = evaluationmap.getLayers().getArray()[1];
    b.setStyle(outletSelectStyle);
    drawOutletChart("tp");
    $("#tp").attr("disabled", true);
    $("#tp").siblings().attr("disabled", false);
});


$("#cost").click(function(event) {
    /* Act on the event */
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[3];
    a.setStyle(styleCostFunction);
    var b = evaluationmap.getLayers().getArray()[1];
    b.setStyle(outletSelectStyle);
    drawOutletChart("cost");
    $("#cost").attr("disabled", true);
    $("#cost").siblings().attr("disabled", false);
});

$("#revenue").click(function(event) {
    /* Act on the event */
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[3];
    a.setStyle(styleRevenueFunction);
    var b = evaluationmap.getLayers().getArray()[1];
    b.setStyle(outletSelectStyle);
    drawOutletChart("revenue");
    $('#revenue').attr("disabled", true);
    $('#revenue').siblings().attr("disabled", false);
});

$("#netreturn").click(function(event) {
    /* Act on the event */
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[3];
    a.setStyle(styleNetReturnFunction);
    var b = evaluationmap.getLayers().getArray()[1];
    b.setStyle(outletSelectStyle);
    drawOutletChart("netreturn");
    $('#netreturn').attr("disabled", true);
    $('#netreturn').siblings().attr("disabled", false);
});

function drawOutletChart(s) {
    selectSingleClick.getFeatures().clear();

    var data = [];
    var dataAverage = [];
    var sum = 0;
    if (s === "sediment") {
        data = outletSediment;
        for (var i = 0; i < data.length; i++) {
            sum = sum + data[i];
        }
        for (var i = 0; i < data.length; i++) {
            dataAverage.push(sum / data.length);
        }
        Highcharts.chart('evaluationchart', {
            title: {
                text: '',
                x: -20 //center
            },

            xAxis: {
                categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                    '2008', '2009', '2010', '2011'
                ]
            },
            yAxis: {
                title: {
                    text: "Sediment (kg/ha/year)"
                },
                lineWidth: 1,

                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Average',
                data: data
            }, {
                name: 'Yr',
                data: dataAverage,
                color: '#99EAA4'
            }]
        });
    }
    if (s === "flow") {
        data = outletFlow;
        for (var i = 0; i < data.length; i++) {
            sum = sum + data[i];
        }
        for (var i = 0; i < data.length; i++) {
            dataAverage.push(sum / data.length);
        }
        Highcharts.chart('evaluationchart', {
            title: {
                text: '',
                x: -20 //center
            },

            xAxis: {
                categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                    '2008', '2009', '2010', '2011'
                ]
            },
            yAxis: {
                title: {
                    text: "Flow (mm/ha/year)"
                },
                lineWidth: 1,

                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Average',
                data: data
            }, {
                name: 'Yr',
                data: dataAverage,
                color: '#99EAA4'
            }]
        });
    }
    if (s === "tp") {
        data = outletTp;
        for (var i = 0; i < data.length; i++) {
            sum = sum + data[i];
        }
        for (var i = 0; i < data.length; i++) {
            dataAverage.push(sum / data.length);
        }
        Highcharts.chart('evaluationchart', {
            title: {
                text: '',
                x: -20 //center
            },

            xAxis: {
                categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                    '2008', '2009', '2010', '2011'
                ]
            },
            yAxis: {
                title: {
                    text: "Total P (kg/ha/year)"
                },
                lineWidth: 1,

                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Average',
                data: data
            }, {
                name: 'Yr',
                data: dataAverage,
                color: '#99EAA4'
            }]
        });

    }
    if (s === "tn") {
        data = outletTn;
        for (var i = 0; i < data.length; i++) {
            sum = sum + data[i];
        }
        for (var i = 0; i < data.length; i++) {
            dataAverage.push(sum / data.length);
        }
        Highcharts.chart('evaluationchart', {
            title: {
                text: '',
                x: -20 //center
            },

            xAxis: {
                categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                    '2008', '2009', '2010', '2011'
                ]
            },
            yAxis: {
                title: {
                    text: "Total N (kg/ha/year)"
                },
                lineWidth: 1,

                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            credits: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Average',
                data: data
            }, {
                name: 'Yr',
                data: dataAverage,
                color: '#99EAA4'
            }]
        });

    }

    if (s === "cost") {
        var ecoType = JSON.stringify(s);
        $.ajax({
            url: '/drawecooutletchart',
            type: "post",
            contentType: 'application/json; charset=utf-8',
            data: ecoType,
            dataType: 'json',
            success: function(r) {
                // console.log(r);
                var averageCost = 0;
                var dataAverage = [];
                for (i = 0; i < r.length; i++) {
                    data.push(r[i]);
                    averageCost += r[i];
                }

                outlet.setProperties({
                    "cost": averageCost / r.length,
                });

                for (j = 0; j < data.length; j++) {
                    dataAverage.push(outlet.getProperties().cost);
                }

                Highcharts.chart('evaluationchart', {
                    title: {
                        text: '',
                        x: -20 //center
                    },

                    xAxis: {
                        categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                            '2008', '2009', '2010', '2011'
                        ]
                    },
                    yAxis: {
                        title: {
                            text: "Cost (dollar)"
                        },
                        lineWidth: 1,

                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Average',
                        data: data
                    }, {
                        name: 'Yr',
                        data: dataAverage,
                        color: '#99EAA4'
                    }]
                });
            }
        });
    }
    if (s === "revenue") {
        var ecoType = JSON.stringify(s);
        $.ajax({
            url: '/drawecooutletchart',
            type: "post",
            contentType: 'application/json; charset=utf-8',
            data: ecoType,
            dataType: 'json',
            success: function(r) {
                // console.log(r);

                var averageRevenue = 0;
                for (i = 0; i < r.length; i++) {
                    data.push(r[i]);
                    averageRevenue += r[i];
                }

                outlet.setProperties({
                    "revenue": averageRevenue / r.length,
                });

                var dataAverage = [];
                for (j = 0; j < data.length; j++) {
                    dataAverage.push(outlet.getProperties().revenue);
                }

                Highcharts.chart('evaluationchart', {
                    title: {
                        text: '',
                        x: -20 //center
                    },

                    xAxis: {
                        categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                            '2008', '2009', '2010', '2011'
                        ]
                    },
                    yAxis: {
                        title: {
                            text: "Revenue (dollar)"
                        },
                        lineWidth: 1,

                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Average',
                        data: data
                    }, {
                        name: 'Yr',
                        data: dataAverage,
                        color: '#99EAA4'
                    }]
                });
            }
        });
    }
    if (s === "netreturn") {
        var ecoType = JSON.stringify(s);
        $.ajax({
            url: '/drawecooutletchart',
            type: "post",
            contentType: 'application/json; charset=utf-8',
            data: ecoType,
            dataType: 'json',
            success: function(r) {
                // console.log(r);

                var averageNetreturn = 0;

                for (i = 0; i < r.length; i++) {
                    data.push(r[i]);
                    averageNetreturn += r[i];
                }


                outlet.setProperties({
                    "netreturn": averageNetreturn / r.length,
                });


                var dataAverage = [];
                for (j = 0; j < data.length; j++) {
                    dataAverage.push(outlet.getProperties().netreturn);
                }

                Highcharts.chart('evaluationchart', {
                    title: {
                        text: '',
                        x: -20 //center
                    },

                    xAxis: {
                        categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                            '2008', '2009', '2010', '2011'
                        ]
                    },
                    yAxis: {
                        title: {
                            text: "Cost (dollar)"
                        },
                        lineWidth: 1,

                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Average',
                        data: data
                    }, {
                        name: 'Yr',
                        data: dataAverage,
                        color: '#99EAA4'
                    }]
                });
            }
        });
    }
}


function determineFeatureType() {
    if ($('#show-field-map-result').prop("disabled") === true) {
        return "field";
    } else
        return "subbasin";
}

function determineFeatureResultType() {
    if ($('#flow').prop("disabled") === true) {
        return "flow";
    }
    if ($('#sediment').prop("disabled") === true) {
        return "sediment";
    }
    if ($('#tn').prop("disabled") === true) {
        return "tn";
    }
    if ($('#tp').prop("disabled") === true) {
        return "tp";
    }
    if ($('#cost').prop("disabled") === true) {
        return "cost";
    }
    if ($('#revenue').prop("disabled") === true) {
        return "revenue";
    }
    if ($('#netreturn').prop("disabled") === true) {
        return "netreturn";
    }
}

function drawFeatureChart(selectedFeature) {
    var feature = new Object();
    feature.ID = parseInt(selectedFeature.getProperties().name);
    feature.Type = "field";
    feature.ResultType = determineFeatureResultType();


    var featureJson = JSON.stringify(feature);
    $.ajax({
        url: '/chart',
        type: "post",
        contentType: 'application/json; charset=utf-8',
        data: featureJson,
        dataType: 'json',
        success: function(r) {
            var dataArray = [];

            for (var i = 0; i < r.length; i++) {
                r[i] = parseFloat(Math.round(r[i] * 100) / 100).toFixed(6);
                dataArray[i] = parseFloat(r[i]);
            }
            // alert(r);

            var average = [];
            var averageNum;
            var chartYTitle;

            if (feature.ResultType == "sediment") {
                averageNum = selectedFeature.getProperties().sediment;
                averageNum = parseFloat((Math.round(averageNum * 100) / 100).toFixed(6));
                for (i = 0; i < 10; i++) {
                    average[i] = averageNum;
                }
                chartYTitle = "Sedimet (ton/ha/year)";
            }
            if (feature.ResultType == "flow") {
                averageNum = selectedFeature.getProperties().flow;
                averageNum = parseFloat((Math.round(averageNum * 100) / 100).toFixed(6));
                for (i = 0; i < 10; i++) {
                    average[i] = averageNum;
                }
                chartYTitle = "Water (mm/year)";

            }
            if (feature.ResultType == "tn") {
                averageNum = selectedFeature.getProperties().tn;
                averageNum = parseFloat((Math.round(averageNum * 100) / 100).toFixed(6));
                for (i = 0; i < 10; i++) {
                    average[i] = averageNum;
                }
                chartYTitle = "Total N (kg/ha/year)";

            }
            if (feature.ResultType == "tp") {
                averageNum = selectedFeature.getProperties().tp;
                averageNum = parseFloat((Math.round(averageNum * 100) / 100).toFixed(6));
                for (i = 0; i < 10; i++) {
                    average[i] = averageNum;
                }
                chartYTitle = "Total P (kg/ha/year)";

            }
            if (feature.ResultType == "cost") {
                averageNum = selectedFeature.getProperties().cost;
                averageNum = parseFloat((Math.round(averageNum * 100) / 100).toFixed(6));
                for (i = 0; i < 10; i++) {
                    average[i] = averageNum;
                }
                chartYTitle = "Cost (dollar)";

            }
            if (feature.ResultType == "revenue") {
                averageNum = selectedFeature.getProperties().revenue;
                averageNum = parseFloat((Math.round(averageNum * 100) / 100).toFixed(6));
                for (i = 0; i < 10; i++) {
                    average[i] = averageNum;
                }
                chartYTitle = "Revenue (dollar)";

            }
            if (feature.ResultType == "netreturn") {
                averageNum = selectedFeature.getProperties().netreturn;
                averageNum = parseFloat((Math.round(averageNum * 100) / 100).toFixed(6));
                for (i = 0; i < 10; i++) {
                    average[i] = averageNum;
                }
                chartYTitle = "Net Return (dollar)";

            }
            Highcharts.chart('evaluationchart', {
                title: {
                    text: '',
                    x: -20 //center
                },

                xAxis: {
                    categories: ['2002', '2003', '2004', '2005', '2006', '2007',
                        '2008', '2009', '2010', '2011'
                    ]
                },
                yAxis: {
                    title: {
                        text: chartYTitle
                    },
                    lineWidth: 1,

                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Average',
                    data: average
                }, {
                    name: 'Yr',
                    data: dataArray,
                    color: '#99EAA4'
                }]
            });

            // $("#sel1").val(selectedResultFeature.getProperties().name);
        }
    });
}

var optimizationConfig = new Object();

document.getElementById("getoptimizationrange").addEventListener("click", function(event) {
    optimizationConfig.selectedLayer = "field";
    // if ($('#optAll').prop("disabled") === true) {
    //     optimizationConfig.selectedFeatureIDs = [];
    // }

    optimizationConfig.selectedFeatureIDs = optimizationFeatureList;
    if (document.getElementById("optFlow").disabled === true) {
        optimizationConfig.selectedType = "Flow";
    }
    if (document.getElementById("optSediment").disabled === true) {
        optimizationConfig.selectedType = "Sediment";
    }
    if (document.getElementById("optTn").disabled === true) {
        optimizationConfig.selectedType = "Total N";
    }
    if (document.getElementById("optTp").disabled === true) {
        optimizationConfig.selectedType = "Total P";
    }

    // optimizationConfig.selectedType = "Sediment";
    // console.log(optimizationConfig.selectedType);

    if (document.getElementById("envMode").disabled === true) {
        optimizationConfig.optimizationMode = "Environmental";
    }
    if (document.getElementById("ecoMode").disabled === true) {
        optimizationConfig.optimizationMode = "Budget";
    }
    var jsonArray = JSON.stringify(optimizationConfig);
    $.ajax({
        url: '/getlowerupperlimites',
        type: "post",
        contentType: 'application/json; charset=utf-8',
        data: jsonArray,
        dataType: 'json',
        success: function(r) {
            // console.log(r.lowerLimit);
            // console.log(r.lowerLimit + r.upperLimit);
            console.log(r.LowerLimit);
            console.log(r.UpperLimit);
            optimizationConfig.lowerLimit = r.LowerLimit;
            optimizationConfig.upperLimit = r.UpperLimit;
            $('#optRange').attr('placeholder', "Between:" + r.UpperLimit + " to " + r.LowerLimit);

            $("#runoptimization").attr('disabled', false);
            $("#getoptimizationrange").attr('disabled', true);
        },
    });
});

var optimizationLayer;

$("#runoptimization").click(function(event) {
    /* Act on the event */
    // optimizationConfig.upperLimit = document.getElementById();

    $(document).trigger('show-loading-page2');
    optimizationConfig.lowerLimit = $("#optRange").val();

    $("#runoptimization").html('Calculating ...');
    var jsonArray = JSON.stringify(optimizationConfig);
    $.ajax({
        url: '/runoptimizationmodel',
        type: "post",
        contentType: 'application/json; charset=utf-8',
        data: jsonArray,
        dataType: 'json',
        success: function(r) {
            // console.log(r.lowerLimit);
            // console.log(r.lowerLimit + r.upperLimit);
            console.log(r[0].IterationNum);
            console.log(r[0].Water);
            console.log(r[0].NetReturn);
            console.log("optimization done");
            $("#runoptimization").attr('disabled', true);

            $("#runoptimization").html('Start Optimization');
            $("#getoptimizationrange").attr('disabled', false);
            optimizationmap.removeInteraction(selectPointerMove2);
            selectPointerMove2 = new ol.interaction.Select({
                // layers: [fieldJsonp2],
                condition: ol.events.condition.pointerMove,
                filter: function(feature, layer) {
                    for (var i = 0; i < optimizationFeatureList.length; i++) {
                        if (optimizationFeatureList[i] == feature.getProperties().name) {
                            return true;
                        }
                    }
                    return false;
                },
            });
            selectPointerMove2.on('select', function(event) {
                var hoveredOptimizationResultFeature = event.selected[0];
                var num;

                if (hoveredOptimizationResultFeature) {
                    var coordinate = ol.extent.getCenter(hoveredOptimizationResultFeature.getGeometry().getExtent());
                    var offsetCoordinate = [coordinate[0], coordinate[1] + 500];
                    if (document.getElementById("getoptimizationrange").disabled === true) {
                        infoOverlay2.setPosition(offsetCoordinate);
                        $(element2).html("FeatureID: " + hoveredOptimizationResultFeature.getProperties().Name);
                        $(element2).show();
                    }
                    if (document.getElementById("runoptimization").disabled === true) {

                        infoOverlay2.setPosition(offsetCoordinate);
                        if ($('#optFlow').prop("disabled") === true) {
                            num = hoveredOptimizationResultFeature.getProperties().flow;
                            num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                            $(element2).html("FeatureID: " + hoveredOptimizationResultFeature.getProperties().name + "<br />" + "Flow " + num + " m^3/year");
                        }
                        if ($('#optSediment').prop("disabled") === true) {
                            num = hoveredOptimizationResultFeature.getProperties().sediment;
                            num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                            $(element2).html("FeatureID: " + hoveredOptimizationResultFeature.getProperties().name + "<br />" + "Sediment " + num + " ton/ha/year");
                        }
                        if ($('#optTn').prop("disabled") === true) {
                            num = hoveredOptimizationResultFeature.getProperties().tn;
                            num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                            $(element2).html("FeatureID: " + hoveredOptimizationResultFeature.getProperties().name + "<br />" + "Total N " + num + " kg/ha/year");
                        }
                        if ($('#optTp').prop("disabled") === true) {
                            num = hoveredOptimizationResultFeature.getProperties().tp;
                            num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
                            $(element2).html("FeatureID: " + hoveredOptimizationResultFeature.getProperties().name + "<br />" + "Total P " + num + " kg/ha/year");
                        }

                        $(element2).show();
                    }
                } else {
                    $(element2).hide();
                }
            });
            optimizationmap.addInteraction(selectPointerMove2);
            drawOptimizationChart(r);
            optimizationLayer = renderOptimizationMap("01", optimizationConfig.selectedType);
            drawOptimizationTable(optimizationLayer);
            $("#loading-page2").css("visibility", "hidden");

        },
    });
});

function drawOptimizationChart(result) {

    var chartData = new Object();
    var chartBudgetData = new Object();

    chartData.name = optimizationConfig.selectedType;
    chartBudgetData.name = "Cost";

    var resultArray = [];
    var budgetResultArray = [];
    var yAxisValue = "";
    if (optimizationConfig.selectedType === "Flow") {
        for (i = 0; i < result.length; i++) {
            resultArray.push(result[i].Water.toFixed(2));
            budgetResultArray.push(result[i].NetReturn);
        }
        yAxisValue = "Water mm";
        unit = "mm";
    }
    if (optimizationConfig.selectedType === "Sediment") {
        for (i = 0; i < result.length; i++) {
            resultArray.push(result[i].Sediment.toFixed(2));
            budgetResultArray.push(result[i].NetReturn);

        }
        yAxisValue = "Sediment ton";
        unit = "ton";

    }
    if (optimizationConfig.selectedType === "Total P") {
        for (i = 0; i < result.length; i++) {
            resultArray.push(result[i].TP.toFixed(2));
            budgetResultArray.push(result[i].NetReturn);

        }
        yAxisValue = "Total P kg";
        unit = "kg";
    }
    if (optimizationConfig.selectedType === "Total N") {
        for (i = 0; i < result.length; i++) {
            resultArray.push(result[i].TN.toFixed(2));
            budgetResultArray.push(result[i].NetReturn);

        }
        yAxisValue = "Total N kg";
        unit = "kg";
    }

    chartData.data = resultArray;
    chartBudgetData.data = budgetResultArray;

    Highcharts.chart('optimizationchart', {
        title: {
            text: '',
        },
        xAxis: {
            categories: chartData.data
        },
        yAxis: [{ // Primary yAxis

            title: {
                text: 'BMP Cost (dollar)',
            }
        }],
        credits: {
            enabled: false
        },

        plotOptions: {
            series: {

                allowPointSelect: true
            }
        },
        series: [{
            name: 'BMP Cost',
            data: chartBudgetData.data,
            showInLegend: false,
            point: {
                events: {
                    select: function(event) {

                        // console.log(this.series.data[1].selected);
                        // console.log(this == this.series.data[1]);
                        var optimizationLayer;

                        if (this == this.series.data[0]) {
                            optimizationLayer = renderOptimizationMap("01", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }

                        if (this == this.series.data[1]) {
                            optimizationLayer = renderOptimizationMap("02", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[2]) {
                            optimizationLayer = renderOptimizationMap("03", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[3]) {
                            optimizationLayer = renderOptimizationMap("04", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[4]) {
                            optimizationLayer = renderOptimizationMap("05", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[5]) {
                            optimizationLayer = renderOptimizationMap("06", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[6]) {
                            optimizationLayer = renderOptimizationMap("07", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[7]) {
                            optimizationLayer = renderOptimizationMap("08", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[8]) {
                            optimizationLayer = renderOptimizationMap("09", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        if (this == this.series.data[9]) {
                            optimizationLayer = renderOptimizationMap("10", optimizationConfig.selectedType);
                            drawOptimizationTable(optimizationLayer);
                        }
                        // if (optimizationChart.series[0].data[1] === this) {
                        //     optimizationLayer = renderOptimizationMap("02", optimizationConfig.selectedType);
                        //     drawOptimizationTable(optimizationLayer);
                        // }                        
                    },
                    // unselect: function(event) {
                    //     var p = this.series.chart.getSelectedPoints();
                    //     if(p.length > 0 && p[0].x == this.x) {
                    //         $('#label').text('point unselected');
                    //     }
                    // }
                }
            }
        }]
    });

}

var fieldOptimizationResult = function(iterationNum, selectedOptimizationType) {

    if (selectedOptimizationType === "Flow") {
        $("#optFlow").attr("disabled", true);
        $('#optFlow').siblings().attr("disabled", false);

        return new ol.layer.Vector({
            source: new ol.source.Vector({
                url: '/static/administration/assets/layers/optfield20' + iterationNum + '.json',
                format: new ol.format.GeoJSON()
            }),
            style: optStyleFlowFunction
        });
    }
    if (selectedOptimizationType === "Sediment") {
        $("#optSediment").attr("disabled", true);
        $('#optSediment').siblings().attr("disabled", false);

        return new ol.layer.Vector({
            source: new ol.source.Vector({
                url: '/static/administration/assets/layers/optfield20' + iterationNum + '.json',
                format: new ol.format.GeoJSON()
            }),
            style: optStyleSedimentFunction
        });
    }
    if (selectedOptimizationType === "Total P") {
        $("#optTp").attr("disabled", true);
        $('#optTp').siblings().attr("disabled", false);

        return new ol.layer.Vector({
            source: new ol.source.Vector({
                url: '/static/administration/assets/layers/optfield20' + iterationNum + '.json',
                format: new ol.format.GeoJSON()
            }),
            style: optStyleTpFunction
        });
    }
    if (selectedOptimizationType === "Total N") {
        $("#optTn").attr("disabled", true);
        $('#optTn').siblings().attr("disabled", false);

        return new ol.layer.Vector({
            source: new ol.source.Vector({
                url: '/static/administration/assets/layers/optfield20' + iterationNum + '.json',
                format: new ol.format.GeoJSON()
            }),
            style: optStyleTnFunction
        });
    }
};

function renderOptimizationMap(iterationNum, selectedOptimizationType) {
    var optimizationFieldLayer = fieldOptimizationResult(iterationNum, selectedOptimizationType);
    optimizationmap.removeLayer(optimizationmap.getLayers().getArray()[2]);
    optimizationmap.addLayer(optimizationFieldLayer);
    return optimizationFieldLayer;
}

function drawOptimizationTable(optimizationLayer) {

    var optTableHeader = '<tr><th style="padding-top:11px;">ID</th><th style="padding-top:11px;">CC</th><th style="padding-top:11px;">CT</th><th style="padding-top:11px;">NM</th><th style="padding-top:11px;">WasCobs</th></tr>';
    var optTableString = '<table class="table table-condensed table-hover" id="optmizationTable">' + optTableHeader;
    var optimizationFeatures;
    setTimeout(function() {
        optimizationFeatures = optimizationLayer.getSource().getFeatures();
        for (var i = 0; i < optimizationFeatures.length; i++) {
            if (optimizationFeatures[i].getProperties().OptBMPs.length !== 0) {
                optTableString += '<tr><td style="padding-top:11px;">' + optimizationFeatures[i].getProperties().name + '</td><td style="padding-top:11px;">' + hasCrp(optimizationFeatures[i].getProperties().OptBMPs) + ' </td><td style="padding-top:11px;">' + hasCov(optimizationFeatures[i].getProperties().OptBMPs) + '</td><td style="padding-top:11px;">' + hasNMAN(optimizationFeatures[i].getProperties().OptBMPs) + '</td><td style="padding-top:11px;">' + hasWAS(optimizationFeatures[i].getProperties().OptBMPs) + '</td></tr>';
            }
        }
        optTableString += "</table>";

        document.getElementById("optmizationTable").innerHTML = optTableString;
    }, 1000);

}

function hasCov(s) {
    var str = s;
    var n = str.search(/All/i);
    if (n !== -1) {
        return "Y";
    }
    n = str.search(/Til/i);
    if (n !== -1) {
        return "Y";
    }
    return "N";
}

function hasNMAN(s) {
    var str = s;

    var n = str.search(/All/i);
    if (n !== -1) {
        return "Y";
    }
    n = str.search(/NMAN/i);
    if (n !== -1) {
        return "Y";
    }
    return "N";

}

function hasCrp(s) {
    var str = s;
    var n = str.search(/All/i);
    if (n !== -1) {
        return "Y";
    }
    n = str.search(/Crp/i);
    if (n !== -1) {
        return "Y";
    }
    return "N";

}

function hasWAS(s) {
    var str = s;

    var n = str.search(/All/i);
    if (n !== -1) {
        return "Y";
    }
    n = str.search(/Was/i);
    if (n !== -1) {
        return "Y";
    }
    return "N";
}



$("#envMode").click(function(event) {
    $("#envMode").attr("disabled", true);
    $("#envMode").siblings().attr("disabled", false);

});
$("#ecoMode").click(function(event) {
    $("#ecoMode").attr("disabled", true);
    $("#ecoMode").siblings().attr("disabled", false);
});

$("#optFlow").click(function(event) {
    selectSingleClick2.getFeatures().clear();
    var a = optimizationmap.getLayers().getArray()[2];
    a.setStyle(optStyleFlowFunction); // var b = evaluationmap.getLayers().getArray()[1];
    // b.setStyle(outletSelectStyle);
    // drawOutletChart("flow");
    $("#optFlow").attr("disabled", true);
    $("#optFlow").siblings().attr("disabled", false);

});
$("#optSediment").click(function(event) {
    /* Act on the event */
    selectSingleClick2.getFeatures().clear();
    var a = optimizationmap.getLayers().getArray()[2];
    a.setStyle(optStyleSedimentFunction); // var b = evaluationmap.getLayers().getArray()[1];
    // b.setStyle(outletSelectStyle);
    // drawOutletChart("sediment");
    $("#optSediment").attr("disabled", true);
    $("#optSediment").siblings().attr("disabled", false);
});
$("#optTn").click(function(event) {
    /* Act on the event */
    selectSingleClick2.getFeatures().clear();
    var a = optimizationmap.getLayers().getArray()[2];
    a.setStyle(optStyleTnFunction); // var b = evaluationmap.getLayers().getArray()[1];
    // b.setStyle(outletSelectStyle);
    // drawOutletChart("tn");
    $("#optTn").attr("disabled", true);
    $("#optTn").siblings().attr("disabled", false);
});
$("#optTp").click(function(event) {
    /* Act on the event */
    selectSingleClick2.getFeatures().clear();
    var a = optimizationmap.getLayers().getArray()[2];
    a.setStyle(optStyleTpFunction);
    // var b = evaluationmap.getLayers().getArray()[1];
    // b.setStyle(outletSelectStyle);
    // drawOutletChart("tp");
    $("#optTp").attr("disabled", true);
    $("#optTp").siblings().attr("disabled", false);
});

$("#optReset").click(function(event) {
    /* Act on the event */
    optimizationFeatureList = [];
    var a = optimizationmap.getLayers().getArray()[2];
    a.setStyle(fieldStyle);
    document.getElementById("optmizationTable").innerHTML = `<tr>
                                <th style="padding-top:11px;">ID</th>
                                <th style="padding-top:11px;">CC</th>
                                <th style="padding-top:11px;">CT</th>
                                <th style="padding-top:11px;">NM</th>
                                <th style="padding-top:11px;">WasCobs</th>
                                <th style="padding-top:11px;">Del</th>
                            </tr>`;
});
