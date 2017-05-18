// 'use strict'

var cls = require('./class');

var currentProgress = " Scenario Comparison";

var progressStatus = [" Scenario Overview", " Scenario Development", " Scenario Evaluation", " Scenario Comparison", " Scenario Optimization"];


var addProgressClickEvent = function(window, document) {
    document.body.addEventListener('click', function(evt) {
        if (cls.hasClass(evt.target, "progressBtn") || cls.hasClass(evt.target, "btnText")) {
            var tempProgress = evt.target.innerText;
            if (evt.target.innerText === " Scenario") {
                tempProgress = evt.target.parentNode.innerText;
            }
            switch (tempProgress) {
                case " Scenario Development":
                    if (progressStatus.indexOf(currentProgress) >= 1) {
                        document.getElementById("content").style.top = window.innerHeight * -1 + "px";
                    }
                    break;
                case " Development":
                    if (progressStatus.indexOf(currentProgress) >= 1) {
                        document.getElementById("content").style.top = window.innerHeight * -1 + "px";
                    }
                    break;
                case " Scenario Evaluation":
                    if (progressStatus.indexOf(currentProgress) >= 2) {
                        document.getElementById("content").style.top = window.innerHeight * -2 + "px";
                    }
                    break;
                case " Evaluation":
                    if (progressStatus.indexOf(currentProgress) >= 2) {
                        document.getElementById("content").style.top = window.innerHeight * -2 + "px";
                    }
                    break;
                case " Scenario Comparison":
                    if (progressStatus.indexOf(currentProgress) >= 3) {
                        document.getElementById("content").style.top = window.innerHeight * -3 + "px";
                    }
                    break;
                case " Comparison":
                    if (progressStatus.indexOf(currentProgress) >= 3) {
                        document.getElementById("content").style.top = window.innerHeight * -3 + "px";
                    }
                    break;
                case " Scenario Optimization":
                    if (progressStatus.indexOf(currentProgress) >= 4) {
                        document.getElementById("content").style.top = window.innerHeight * -4 + "px";
                    }
                    break;
                case " Optimization":
                    if (progressStatus.indexOf(currentProgress) >= 4) {
                        document.getElementById("content").style.top = window.innerHeight * -4 + "px";
                    }
                    break;
                default:
                    document.getElementById("content").style.top = 0 + "px";
                    cls.removeClass(evt.target, "button-caution");
                    cls.addClass(evt.target, "button-primary");
            }
        }
    });
}





module.exports['currentProgress'] = currentProgress;
module.exports['progressStatus'] = progressStatus;
module.exports['addProgressClickEvent'] = addProgressClickEvent;
