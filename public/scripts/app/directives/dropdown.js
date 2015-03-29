"use strict";

module.exports = /*@ngInject*/ function($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'dropdown',
        scope: {
            placeholder: '@',
            list: '=',
            selected: '=',
            property: '@'
        },
        link: function(scope) {
            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function(item) {
                scope.isPlaceholder = false;
                scope.selected = item;
            };

            scope.isSelected = function(item) {
                return item[scope.property] === scope.selected[scope.property];
            };

            scope.show = function() {
                scope.listVisible = true;
            };

            $rootScope.$on('pact:document-clicked', function(inner, target) {
                console.log('HERE', inner, target);
                //console.log($(target[0]).is('.dropdown-display.clicked') || $(target[0]).parents('.dropdown-display.clicked').length > 0);
                //if (!$(target[0]).is('.dropdown-display.clicked') && !$(target[0]).parents('.dropdown-display.clicked').length > 0)
                var $target = angular.element(target[0]);

                if (!$target.hasClass('dropdown-display') &&
                    !$target.hasClass('clicked') &&
                    !$target.parent().hasClass('dropdown-display') &&
                    !$target.parent().hasClass('clicked')) {

                    scope.$apply(function() {
                        scope.listVisible = false;
                    });
                }
            });

            scope.$watch('selected', function(value) {
                if (!value) {
                    return;
                }

                scope.isPlaceholder = scope.selected[scope.property] === undefined;
                scope.display = scope.selected[scope.property];
            });
        }
    }
};