//
// load libraries
//
window.onload = function() {
    // Animate loader off screen
    setTimeout(function() {
        $(".se-pre-con").fadeOut("slow");
    }, 1000);
};

window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var layout = require('./modules/layout');
var progress = require('./modules/progress');
var style = require('./modules/style');
var table = require('./modules/table');
var button = require('./modules/mapbtn');
var ol = require('openlayers');

$(document).ready(function() {

    layout.resize(document, window);
    window.addEventListener("resize", function() {
        layout.resize(document, window);
    });
    $('[data-toggle="tooltip"]').tooltip();
    progress.addProgressClickEvent(window, document);
    table.initScenarioTable();


    var clientName = document.getElementById("clientName").innerText;
    var tiledRaster = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var fieldLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/static/farmer/assets/layers/field.json',
            format: new ol.format.GeoJSON()
        }),
        style: style.defaultStyle
    });

    fieldLayer.getSource().on('addfeature', function(event) {
        var fieldFeatures = fieldLayer.getSource().getFeatures();
        var client = JSON.stringify(clientName);
        $.ajax({
                url: '/getfield',
                type: 'post',
                contentType: 'application/json; charset=utf-8',
                data: client,
                dataType: 'json',
            })
            .done(function(r) {
                for (var i = 0; i < fieldFeatures.length; i++) {
                    var id = parseInt(fieldFeatures[i].getProperties().Name);
                    for (var j = 0; j< r.Fields.length; j++){
                        if (id === r.Fields[j]){
                            fieldFeatures[i].setStyle(style.fieldStyle);
                            fieldFeatures[i].setProperties({
                                'Visible':'Y'
                            });
                        }
                    }

                }
            })
            .fail(function(r) {
                console.log("error");
            })
            .always(function(r) {
                console.log("complete");
            });
    });

    var boundary = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/static/farmer/assets/layers/boundary.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: style.boundaryStyle
    });
    var outletFeature = new ol.Feature({});
    var point_geom = new ol.geom.Point(
        ol.proj.transform([-81.7132830619812, 43.61527726000183], 'EPSG:4326', 'EPSG:3857')
    );
    outletFeature.setGeometry(point_geom);
    var outlet = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [outletFeature]
        }),
        zIndex: 10
    });
    outlet.setStyle(style.outletDefaultStyle);
    var element = document.getElementById('overlay');
    var overlay = new ol.Overlay({
        element: document.getElementById('overlay'),
        positioning: 'bottom-center',
        stopEvent: false
    });
    var selectPointerMove = new ol.interaction.Select({
        layers: [fieldLayer],
        condition: ol.events.condition.pointerMove,
        filter: function(feature, layer) {
            if (layer === fieldLayer) {
                if (feature.getProperties().Visible === 'Y') {
                    return true;
                }
            }
            return false;
        },
    });
    var overviewMap = new ol.Map({
        target: 'overviewMap',
        layers: [tiledRaster, boundary, outlet, fieldLayer],
        view: new ol.View({
            center: ol.proj.transform([-81.6555, 43.614], 'EPSG:4326', 'EPSG:3857'),
            zoom: 13
        })
    });
    overviewMap.addOverlay(overlay);
    overviewMap.addInteraction(selectPointerMove);
    console.log(overviewMap.getLayers().getArray().length);

});
