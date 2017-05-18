//
// load libraries
//
window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var layout = require('./modules/layout');
var progress = require('./modules/progress');
var style = require('./modules/style');
var table = require('./modules/table');
var map = require('./modules/map');
var button = require('./modules/mapbtn');

$(document).ready(function() {
    layout.resize(document, window);
    window.addEventListener("resize", function() {
        layout.resize(document, window);
    });
    $('[data-toggle="tooltip"]').tooltip();    
    progress.addProgressClickEvent(window, document);
    table.initScenarioTable();

    var overviewMap = map.initMap();
    console.log(overviewMap.getLayers().getArray().length);

    button.addMapLayerBtnClickListener(overviewMap, document);
});


