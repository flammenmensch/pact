"use strict";

module.exports = /*@ngInject*/ function($scope, PictureModel) {
    $scope.tempPicture = PictureModel.picture;
    $scope.showCamera = false;

    $scope.done = function() {
        $scope.closeThisDialog($scope.tempPicture);
    };

    $scope.$on('pact:file-selected', function($event, dataUrl) {
        $scope.tempPicture = dataUrl;
    });

    $scope.camera = function() {
        $scope.showCamera = true;
    };

    $scope.$on('pact:camera-done', function($event, dataUrl) {
        $scope.showCamera = false;
        $scope.tempPicture = dataUrl;
    });

    $scope.$on('pact:camera-cancel', function() {
        $scope.showCamera = false;
    });
};