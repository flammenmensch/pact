"use strict";

module.exports = function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>'
    };
};