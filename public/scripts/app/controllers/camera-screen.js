"use strict";

module.exports = /*@ngInject*/ function($scope) {
    $scope.cameraError = false;

    $scope.preview = false;
    $scope.picture = null;

    $scope.back = function() {
        $scope.$emit('pact:camera-cancel');
    };

    $scope.takePicture = function() {
        $scope.$broadcast('pact:camera-shoot');
    };

    $scope.reshoot = function() {
        $scope.picture = null;
        $scope.preview = false;
    };

    $scope.done = function() {
        $scope.$emit('pact:camera-done', $scope.picture);
    };

    $scope.$on('pact:camera-error', function() {
        $scope.cameraError = true;
    });

    $scope.$on('pact:camera-picture-taken', function($event, dataUrl) {
        $scope.preview = true;
        $scope.picture = dataUrl;
    });
};