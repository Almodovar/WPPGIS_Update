var style = require('./style');
var ol = require('openlayers');



var initMap = function(name) {

    var tiledRaster = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var field = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/static/farmer/assets/layers/field.json',
            format: new ol.format.GeoJSON()
        }),
        style: style.fieldStyle
    });
    field.getSource().on('addfeature', function(event) {
        var fieldFeatures = field.getSource().getFeatures();
        for (i = 0; i < fieldFeatures.length; i++) {
            for (var j = 0; j < r.Fields.length; j++) {
                if (fieldFeatures[i].getProperties().Name === r.Fields[j].toString()) {
                    fieldFeatures[i].setStyle(null);
                }
            }
        }
    });
    var subbasin = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/static/farmer/assets/layers/basin.json',
            format: new ol.format.GeoJSON()
        }),
        style: style.subbasinStyle
    });

    var boundary = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/assets/data/geojson/boundary.geojson',
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
        condition: ol.events.condition.pointerMove,
        filter: function(feature, layer) {
            if (layer === field) {
                if (feature.getProperties().Name > 600) {
                    return false;
                }
                return true;
            }
            return true;
        },
    });
    var map = new ol.Map({
        target: 'overviewMap',
        layers: [tiledRaster, boundary, outlet, field, subbasin],
        view: new ol.View({
            center: ol.proj.transform([-81.6555, 43.614], 'EPSG:4326', 'EPSG:3857'),
            zoom: 13
        })
    });
    map.addOverlay(overlay);
    subbasin.setVisible(false);
    map.addInteraction(selectPointerMove);
    return map;
};

var addFilter = function(map, layer) {
    var clientName = JSON.stringify(name);
    $.ajax({
            url: '/getfield',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: clientName,
            dataType: 'json',
            async: false,
        })
        .done(function(r) {
            console.log(r.Fields);

        })
        .fail(function(r) {
            console.log("error");
        })
        .always(function(r) {
            console.log("complete");
        });
};

var addLayer = function(map, layer) {
    map.addLayer(layer);
};

var removeLayer = function(map, layer) {
    map.removeLayer(layer);
};

var getLayerIndex = function(map, layer) {
    return map.getLayers().getArray().indexOf(layer);
};

var removeLayerByIndex = function(index) {
    var layer = map.getLayers().getArray()[index];
    map.removeLayer(layer);
};



module.exports['initMap'] = initMap;
module.exports['addLayer'] = addLayer;
module.exports['removeLayer'] = removeLayer;
module.exports['getLayerIndex'] = getLayerIndex;
module.exports['removeLayerByIndex'] = removeLayerByIndex;
