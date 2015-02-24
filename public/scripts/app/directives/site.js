"use strict";

module.exports = function() {
    return {
        restrict: 'E',
        replace: true,
        tranclude: true,
        scope: {},
        template: '<div><div ng-transclude></div></div>'
    };
};