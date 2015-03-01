"use strict";

module.exports = /*@ngInject*/ function($scope, UserModel, PictureModel, ImageService) {
    $scope.faces = [ ];
    $scope.faceFound = false;
    $scope.error = false;

    $scope.$on('pact:error', function($event, error) {
        console.error('Error handler', error);
        $scope.error = true;
    });

    $scope.$on('pact:face-found', function($event, info) {
        $scope.error = false;
        $scope.faceFound = true;
        $scope.faces = info.tags;
    });

    $scope.tryAgain = function() {
        $scope.faces = [ ];
        $scope.faceFound = false;
        $scope.error = false;
    };

    $scope.loadOriginalPicture = function() {
        ImageService
            .loadImage('/api/proxy?url=' + encodeURIComponent('http://images.wisegeek.com/triangular-face.jpg'))
            //.loadImage('/api/proxy?url=' + encodeURIComponent(UserModel.user.picture.data.url))
            .then(ImageService.getDataUrl)
            .then(function(dataUrl) {
                PictureModel.setPicture(dataUrl);
            })
            .catch(function(err) {
                console.error('Error loading original picture', err);
            });
    };

    $scope.loadOriginalPicture();
};