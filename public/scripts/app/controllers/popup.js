"use strict";

module.exports = /*@ngInject*/ function($scope, $window, PictureModel) {
    $scope.stream = undefined;
    $scope.tempPicture = PictureModel.picture;

    $scope.done = function() {
        $scope.closeThisDialog($scope.tempPicture);
    };

    $scope.init = function() {
        /*$window.navigator.webkitGetUserMedia({ video: true }, function(stream) {
            $scope.stream = $window.URL.createObjectURL(stream);
        }, console.error);*/
    };

    $scope.$on('pact:file-selected', function($event, dataUrl) {
        $scope.tempPicture = dataUrl;
    });

    $scope.$on('$destroy', function() {
        $window.URL.revokeObjectURL($scope.stream);
        $scope.stream = null;
    });

    $scope.init();
};