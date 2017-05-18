// 'use strict'

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function removeClass(element, cls) {
    element.classList.remove(cls);
}

function addClass(element, cls) {
    element.classList.add(cls);
}

module.exports['hasClass'] = hasClass;
module.exports['removeClass'] = removeClass;
module.exports['addClass'] = addClass;