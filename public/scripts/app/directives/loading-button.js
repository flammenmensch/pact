"use strict";

module.exports = function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            ptLoading: '=ptLoading'
        },
        template: '<button type="button"><pt-loader ng-if="ptLoading"></pt-loader><span ng-if="!ptLoading" ng-transclude></span></button>'
    };
};