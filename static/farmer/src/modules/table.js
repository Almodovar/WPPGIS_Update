var initScenarioTable = function() {
    $("#scenarioTable ul ul").hide();

    $("#scenarioTable p").click(function() {
        $("#scenarioTable p").css({ "background-color": "white", "color": "black" });
        // $(this).css({ "background-color": "rgb(66,139,202)", "color": "white" });
        $("#scenarioTable ul ul").slideUp();
        if (!$(this).next().next().is(":visible")) {
            $(this).next().next().slideDown();
        }
    });
};


var loadScenarioTable = function(){
	
};

module.exports['initScenarioTable'] = initScenarioTable;
module.exports['loadScenarioTable'] = loadScenarioTable;
