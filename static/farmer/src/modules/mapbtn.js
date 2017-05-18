var cls = require("./class");

var addMapLayerBtnClickListener = function(map, document) {
    document.body.addEventListener("click", function(evt) {
        if (cls.hasClass(evt.target, "mapLayerBtn")) {
            var siblings = evt.target.parentNode.childNodes;
            siblings.forEach(function(element, index) {
                element.disabled = false;
            });
            evt.target.disabled = true;
        }

        console.log(map.getLayers().getArray().length);

        if (evt.target.innerText === "Subbasin"){
            map.getLayers().getArray()[3].setVisible(false);
            map.getLayers().getArray()[4].setVisible(true);
        }
        if (evt.target.innerText === "Field"){
            map.getLayers().getArray()[4].setVisible(false);
            map.getLayers().getArray()[3].setVisible(true);
        }        
    });
};

var addMapResultBtnClickListener = function(map, document) {
    document.body.addEventListener("click", function(evt) {
        if (cls.hasClass(evt.target, "mapResultBtn")) {
            var siblings = evt.target.parentNode.childNodes;
            siblings.forEach(function(element, index) {
                element.disabled = false;
            });
            evt.target.disabled = true;
        }

        console.log(map.getLayers().getArray().length);

        if (evt.target.innerText === "Flow"||evt.target.innerText === "F"){
        }
        if (evt.target.innerText === "Sediment"||evt.target.innerText === "S"){
        }    
    });
};

module.exports['addMapLayerBtnClickListener'] = addMapLayerBtnClickListener;
module.exports['addMapResultBtnClickListener'] = addMapResultBtnClickListener;
