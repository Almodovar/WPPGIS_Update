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
$("#loading-info").css('margin-top', ($("#loading-page").height() - 400) / 2);

$("#loading-page2").css('height', 150);
$("#loading-info2").css('margin-top', ($("#loading-page2").height() - 400) / 2);

$(window).bind('mousewheel', function(event) {
    if (document.getElementById('dashboard').style.display == "block") {
        if (event.originalEvent.wheelDelta >= 0) {
            $("html, body").animate({ scrollTop: $('body').offset().top }, 1000);
        } else {
            $("html, body").animate({ scrollTop: $('#networkAnchor').offset().top }, 1000);
        }
    }
});


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
        text: ''
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            '' : ''
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'NUMBER'
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
        name: 'Daily Login',
        data: [
            [Date.UTC(2013, 5, 2), 3],
            [Date.UTC(2013, 5, 3), 4],
            [Date.UTC(2013, 5, 4), 7],
            [Date.UTC(2013, 5, 5), 2],
            [Date.UTC(2013, 5, 6), 4],
            [Date.UTC(2013, 5, 7), 6],
            [Date.UTC(2013, 5, 9), 10],
            [Date.UTC(2013, 5, 10), 5],
            [Date.UTC(2013, 5, 11), 9],
            [Date.UTC(2013, 5, 12), 12],
            [Date.UTC(2013, 5, 13), 10],
            [Date.UTC(2013, 5, 14), 8],
            [Date.UTC(2013, 5, 16), 11],
            [Date.UTC(2013, 5, 17), 13],
            [Date.UTC(2013, 5, 18), 15],
            [Date.UTC(2013, 5, 19), 14],
            [Date.UTC(2013, 5, 20), 16],
            [Date.UTC(2013, 5, 21), 20],
            [Date.UTC(2013, 5, 23), 17],
            [Date.UTC(2013, 5, 24), 9],
            [Date.UTC(2013, 5, 25), 22],
            [Date.UTC(2013, 5, 26), 20],
            [Date.UTC(2013, 5, 27), 23],
            [Date.UTC(2013, 5, 28), 26],
            [Date.UTC(2013, 5, 30), 24],
            [Date.UTC(2013, 6, 1), 23],
            [Date.UTC(2013, 6, 2), 28],
            [Date.UTC(2013, 6, 3), 30],
            [Date.UTC(2013, 6, 4), 30],
            [Date.UTC(2013, 6, 5), 22],
            [Date.UTC(2013, 6, 7), 26],
            [Date.UTC(2013, 6, 8), 35],
            [Date.UTC(2013, 6, 9), 33],
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
    evaluationmap.getLayers().getArray()[4].setStyle(fieldStyle);
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
    "source": "beta",
    "target": "gamma"
}, {
    "source": "beta",
    "target": "delta"
}, {
    "source": "Jason",
    "target": "Kevin"
}, {
    "source": "Kevin",
    "target": "gamma"
}, {
    "source": "theta",
    "target": "Kevin"
}, {
    "source": "alpha",
    "target": "John"
}, {
    "source": "alpha",
    "target": "gamma"
}, {
    "source": "Tom",
    "target": "Kevin"
}, {
    "source": "alpha",
    "target": "gamma"
}, {
    "source": "alpha",
    "target": "gamma"
}, {
    "source": "alpha",
    "target": "eta"
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
var wascobArray = [];

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

function WasCobs(id, feature, field, subbasin) {
    this.id = id;
    this.feature = feature;
    this.field = field;
    this.subbasin = subbasin;
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


var wascobStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({ color: 'rgba(69,139,225,0.6)' }),
        stroke: new ol.style.Stroke({ color: 'white', width: 1 })
    }),
});


var wascobSelectStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({ color: 'rgba(34,34,85,0.6)' }),
        stroke: new ol.style.Stroke({ color: 'yellow', width: 2 })
    }),
});

var wascobJsonp = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: '/static/administration/assets/layers/wascob.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: wascobStyle,
    zIndex: 10,
});

wascobJsonp.getSource().on('addfeature', function(event) {
    wascobFeatures = wascobJsonp.getSource().getFeatures();
    for (i = 0; i < wascobFeatures.length; i++) {
        var wascob = new WasCobs();
        wascob.id = wascobFeatures[i].getProperties().NAME;
        wascob.feature = wascobFeatures[i];
        wascob.field = wascobFeatures[i].getProperties().FIELD;
        wascobArray.push(wascob);
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
    layers: [fieldJsonp, outletLayer, subbasinJsonp, wascobJsonp],
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
    // layers: [fieldJsonp, outletLayer, subbasinJsonp],
    filter: function(feature, layer) {
        if (layer === fieldJsonp) {
            if (document.getElementById("cc").disabled || document.getElementById("ct").disabled || document.getElementById("nm").disabled) {
                if (feature.getProperties().Name > 600) {
                    return false;
                }
                return true;
            }
            if (document.getElementById("wc").disabled) {
                return false;
            }
        } else if (layer === wascobJsonp) {
            if (document.getElementById("cc").disabled || document.getElementById("ct").disabled || document.getElementById("nm").disabled) {
                return false;
            }
            if (document.getElementById("wc").disabled) {
                return true;
            }
        } else {
            return false;
        }
    },
});

var selectPointerMove2 = new ol.interaction.Select({
    layers: [fieldJsonp2, wascobJsonp],
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
    var selectedFeature = event.selected[0];
    var id;
    if (selectedFeature) {
        if (document.getElementById("runmodel").disabled === false) {
            if (document.getElementById("wc").disabled) {
                id = selectedFeature.getProperties().Field;
                selectedFeature.setStyle(wascobSelectStyle);
            }
            if (document.getElementById("cc").disabled || document.getElementById("ct").disabled || document.getElementById("nm").disabled) {
                id = selectedFeature.getProperties().Name;
                selectedFeature.setStyle(selectedStyle);
            }
            if (fieldBMPAssignment[id] === undefined) {
                fieldBMPAssignment[id] = {
                    cc: 'N',
                    ct: 'N',
                    nm: 'N',
                    wc: 'N',
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
            if (document.getElementsByClassName('bmpbtn')[3].disabled === true) {
                fieldBMPAssignment[id].wc = 'Y';
            }
            var selectedFeatureID = document.getElementsByClassName("selectedFeatureID");
            for (var i = 0; i < selectedFeatureID.length; i++) {
                console.log(selectedFeatureID[i].innerText);
                if (selectedFeatureID[i].innerText == id) {
                    document.getElementById("evaluationTable").deleteRow(selectedFeatureID[i].parentNode.rowIndex);
                }
            }
            $('#evaluationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedFeatureID">' +
                id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].cc + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].ct + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].nm + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].wc + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');
        } else {
            var b = evaluationmap.getLayers().getArray()[1];
            b.setStyle(outletDefaultStyle);
            drawFeatureChart(selectedFeature);
        }
    } else {
        if (document.getElementById("runmodel").disabled === true) {
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
    var hoveredFeature = event.selected[0];
    if (hoveredFeature) {
        var coordinate = ol.extent.getCenter(hoveredFeature.getGeometry().getExtent());
        var offsetCoordinate = [coordinate[0], coordinate[1] + 500];

        if (document.getElementById("runmodel") === false) {
            infoOverlay.setPosition(offsetCoordinate);
            if (hoveredFeature.getProperties().Name !== undefined) {
                $(element).html("FeatureID: " + hoveredFeature.getProperties().Name);
            }
            if (hoveredFeature.getProperties().Field !== undefined) {
                $(element).html("WasCobID: " + hoveredFeature.getProperties().Field);
            }
            $(element).show();
            infoOverlay.setPosition(offsetCoordinate);
        } else {
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
        }
    } else {
        $(element).hide();
    }
});
selectPointerMove2.on('select', function(event) {
    var hoveredFeature = event.selected[0];
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
        }), outletLayer, vector, wascobJsonp, fieldJsonp,
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
        }), vector2, wascobJsonp, fieldJsonp2,
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
    if (document.getElementsByClassName('bmpbtn')[0].disabled || document.getElementsByClassName('bmpbtn')[1].disabled || document.getElementsByClassName('bmpbtn')[2].disabled) {
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
                        wc: 'N',
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
                    if (selectedFeatureID[i].innerText == id) {
                        document.getElementById("evaluationTable").deleteRow(selectedFeatureID[i].parentNode.rowIndex);
                    }
                }
                $('#evaluationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedFeatureID">' +
                    id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    fieldBMPAssignment[id].cc + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    fieldBMPAssignment[id].ct + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    fieldBMPAssignment[id].nm + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                    fieldBMPAssignment[id].wc + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');
            }
        });
    }
    if (document.getElementsByClassName('bmpbtn')[3].disabled) {
        wascobJsonp.getSource().forEachFeatureIntersectingExtent(feature.getGeometry().getExtent(), function(feature) {
            feature.setStyle(wascobSelectStyle);
            var id = feature.getProperties().Field;
            if (fieldBMPAssignment[id] === undefined) {
                fieldBMPAssignment[id] = {
                    cc: 'N',
                    ct: 'N',
                    nm: 'N',
                    wc: 'N',
                };
            }
            if (document.getElementsByClassName('bmpbtn')[3].disabled === true) {
                fieldBMPAssignment[id].wc = 'Y';
            }

            var selectedFeatureID = document.getElementsByClassName("selectedFeatureID");
            for (var i = 0; i < selectedFeatureID.length; i++) {
                console.log(selectedFeatureID[i].innerText);
                if (selectedFeatureID[i].innerText == id) {
                    document.getElementById("evaluationTable").deleteRow(selectedFeatureID[i].parentNode.rowIndex);
                }
            }
            $('#evaluationTable').append('<tr class="table-data rowSelected"><td style="padding-top:11px;" class="selectedFeatureID">' +
                id + '</td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].cc + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].ct + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].nm + '</a></td><td style="padding-top:11px;"><a class="table-edit" data-type="select">' +
                fieldBMPAssignment[id].wc + '</a></td><td class="deleteSelectedFeature" style="white-space: nowrap;width: 1%;"><a class="btn btn-danger btn-sm" aria-label="Delete"><i class="fa fa-trash-o " aria-hidden="true"></i></a></td></tr>');
        });
    }
    source.clear();
});

source2.on('addfeature', function(evt) {
    var feature = evt.feature;
    var coords = feature.getGeometry().getCoordinates();
    console.log(coords);
    var a = optimizationmap.getLayers().getArray()[3];
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

document.getElementById("wc").addEventListener('click', function(event) {
    selectSingleClick.getFeatures().clear();
    for (var i = 0; i < fieldArray.length; i++) {
        fieldArray[i].feature.setStyle(null);
    }

    for (var j in fieldBMPAssignment) {
        console.log(j);
        if (fieldBMPAssignment[j].wc == "Y") {
            for (var z = 0; z < wascobArray.length; z++) {
                if (wascobArray[z].Field === j) {
                    wascobArray[z].feature.setStyle(wascobSelectStyle);
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

var selectSingleClickAfter;

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
        console.log(bmpAssignment);

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

            evaluationmap.removeLayer(evaluationmap.getLayers().getArray()[4]);

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


            $('#flow').attr("disabled", true);
            $('#flow').siblings().attr("disabled", false);

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

            evaluationmap.addInteraction(selectPointerMove);
            document.getElementById("ct").disabled = true;
            document.getElementById("wc").disabled = false;
            drawOutletChart("flow");
            $("#loading-page").css("visibility", "hidden");
        }
    });
});

$("#flow").click(function(event) {
    selectSingleClick.getFeatures().clear();
    var a = evaluationmap.getLayers().getArray()[4];
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
    var a = evaluationmap.getLayers().getArray()[4];
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
    var a = evaluationmap.getLayers().getArray()[4];
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
    var a = evaluationmap.getLayers().getArray()[4];
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
    var a = evaluationmap.getLayers().getArray()[4];
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
    var a = evaluationmap.getLayers().getArray()[4];
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
    var a = evaluationmap.getLayers().getArray()[4];
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
    optimizationmap.removeLayer(optimizationmap.getLayers().getArray()[3]);
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
    var a = optimizationmap.getLayers().getArray()[3];
    a.setStyle(optStyleFlowFunction); // var b = evaluationmap.getLayers().getArray()[1];
    // b.setStyle(outletSelectStyle);
    // drawOutletChart("flow");
    $("#optFlow").attr("disabled", true);
    $("#optFlow").siblings().attr("disabled", false);

});
$("#optSediment").click(function(event) {
    /* Act on the event */
    selectSingleClick2.getFeatures().clear();
    var a = optimizationmap.getLayers().getArray()[3];
    a.setStyle(optStyleSedimentFunction); // var b = evaluationmap.getLayers().getArray()[1];
    // b.setStyle(outletSelectStyle);
    // drawOutletChart("sediment");
    $("#optSediment").attr("disabled", true);
    $("#optSediment").siblings().attr("disabled", false);
});
$("#optTn").click(function(event) {
    /* Act on the event */
    selectSingleClick2.getFeatures().clear();
    var a = optimizationmap.getLayers().getArray()[3];
    a.setStyle(optStyleTnFunction); // var b = evaluationmap.getLayers().getArray()[1];
    // b.setStyle(outletSelectStyle);
    // drawOutletChart("tn");
    $("#optTn").attr("disabled", true);
    $("#optTn").siblings().attr("disabled", false);
});
$("#optTp").click(function(event) {
    /* Act on the event */
    selectSingleClick2.getFeatures().clear();
    var a = optimizationmap.getLayers().getArray()[3];
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
    var a = optimizationmap.getLayers().getArray()[3];
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
