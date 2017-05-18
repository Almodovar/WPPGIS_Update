    // var Great = 'rgba(53, 191, 0, 0.6)';
    // var Good = 'rgba(115, 197, 0, 0.6)';
    // var Normal = 'rgba(181, 203, 0, 0.6)';
    // var Slight = 'rgba(210, 168, 0, 0.6)';
    // var Bad = 'rgba(216, 170, 0, 0.6)';
    // var Severe = 'rgba(229, 0, 26, 0.6)';
    var ol = require('openlayers');

    var severityLevel = {
        "Great": 'rgba(53, 191, 0, 0.6)',
        "Good": 'rgba(115, 197, 0, 0.6)',
        "Normal": 'rgba(181, 203, 0, 0.6)',
        "Slight": 'rgba(210, 168, 0, 0.6)',
        "Bad": 'rgba(216, 170, 0, 0.6)',
        "Severe": 'rgba(229, 0, 26, 0.6)'
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

    var boundaryStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(17,34,68,0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
        })
    });

    var fieldStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(87,178,47,0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: 'white'
        })
    });
    var subbasinStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(17,34,68,0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: 'white'
        })
    });
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

    var styleCache = {};

    var styleSedimentFunction = function(feature, resolution) {
        var properties = feature.getProperties();
        var level = feature.getProperties().sedimentlevel;
        if (!level || !severityLevel[level]) {
            return [defaultStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: severityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    };

    var styleFlowFunction = function(feature, resolution) {
        var properties = feature.getProperties();
        var level = feature.getProperties().flowlevel;
        if (!level || !severityLevel[level]) {
            return [defaultStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: severityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    };

    var styleTpFunction = function(feature, resolution) {
        var properties = feature.getProperties();
        var level = feature.getProperties().tplevel;
        if (!level || !severityLevel[level]) {
            return [defaultStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: severityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    };

    var styleTnFunction = function(feature, resolution) {
        var properties = feature.getProperties();
        var level = feature.getProperties().tnlevel;
        if (!level || !severityLevel[level]) {
            return [defaultStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: severityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    };

    var styleCostFunction = function(feature, resolution) {
        var properties = feature.getProperties();
        var level = feature.getProperties().costlevel;
        if (!level || !severityLevel[level]) {
            return [defaultStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: severityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    };

    var styleRevenueFunction = function(feature, resolution) {
        var properties = feature.getProperties();
        var level = feature.getProperties().revenuelevel;
        if (!level || !severityLevel[level]) {
            return [defaultStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: severityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    };

    var styleNetReturnFunction = function(feature, resolution) {
        var properties = feature.getProperties();
        var level = feature.getProperties().netreturnlevel;
        if (!level || !severityLevel[level]) {
            return [defaultStyle];
        }
        if (!styleCache[level]) {
            styleCache[level] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: severityLevel[level]
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            });
        }
        return [styleCache[level]];
    };




    module.exports['severityLevel'] = severityLevel;
    module.exports['defaultStyle'] = defaultStyle;
    module.exports['boundaryStyle'] = boundaryStyle;
    module.exports['fieldStyle'] = fieldStyle;
    module.exports['subbasinStyle'] = subbasinStyle;
    module.exports['outletDefaultStyle'] = outletDefaultStyle;
    module.exports['outletSelectStyle'] = outletSelectStyle;

    module.exports['styleCache'] = styleCache;

    module.exports['styleSedimentFunction'] = styleSedimentFunction;
    module.exports['styleFlowFunction'] = styleFlowFunction;
    module.exports['styleTpFunction'] = styleTpFunction;
    module.exports['styleTnFunction'] = styleTnFunction;
    module.exports['styleCostFunction'] = styleCostFunction;
    module.exports['styleRevenueFunction'] = styleRevenueFunction;
    module.exports['styleNetReturnFunction'] = styleNetReturnFunction;
