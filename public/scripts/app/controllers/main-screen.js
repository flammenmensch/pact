"use strict";

module.exports = /*@ngInject*/ function($scope, UserModel, PictureModel, ImageService) {
    $scope.faces = [ ];
    $scope.faceFound = false;
    $scope.error = false;

    $scope.originalPicture = null;

    $scope.$on('pact:error', function($event, error) {
        console.error('Error handler', error);
        $scope.error = true;
    });

    $scope.$on('pact:face-found', function($event, info) {
        $scope.error = false;
        $scope.faceFound = true;
        $scope.faces = info.tags;

        ImageService.applyTransformation(PictureModel.picture, $scope.faces).then(function(dataUrl) {
            $scope.originalPicture = PictureModel.picture;
            PictureModel.setPicture(dataUrl);
        });
    });

    $scope.tryAgain = function() {
        $scope.faces = [ ];
        $scope.faceFound = false;
        $scope.error = false;

        PictureModel.setPicture($scope.originalPicture);
    };

    $scope.loadOriginalPicture = function() {
        ImageService
            .loadImage('/api/proxy?url=' + encodeURIComponent('http://images.wisegeek.com/triangular-face.jpg'))
            //.loadImage('/api/proxy?url=' + encodeURIComponent(UserModel.user.picture.data.url))
            .then(ImageService.getDataUrl.bind(ImageService))
            .then(function(dataUrl) {
                PictureModel.setPicture(dataUrl);
            })
            .catch(function(err) {
                console.error('Error loading original picture', err);
            });
    };

    $scope.loadOriginalPicture();
};