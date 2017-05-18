// 'use strict'

var resize = function(document, window) {
    var height = window.innerHeight;
    var width = window.innerWidth;

    document.getElementById("wrapper").style.width = width + "px";
    document.getElementById("wrapper").style.height = height + "px";
    document.getElementById("content").style.height = height * 5 + "px";

    var pages = document.getElementsByClassName("page");
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.height = height + "px";
    }

    document.getElementById("overviewMap").style.height = document.getElementById("page1").offsetHeight * 0.85 - document.getElementById("overviewMapToolBar").offsetHeight - 10 + "px";
};

module.exports['resize'] = resize;
