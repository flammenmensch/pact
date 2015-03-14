"use strict";

module.exports = /*@ngInject*/ function($scope, PictureModel, ImageService, FacebookService) {
    $scope.tempPicture = PictureModel.picture;
    $scope.showCamera = false;
    $scope.profilePhotos = [ ];

    $scope.done = function() {
        $scope.closeThisDialog($scope.tempPicture);
    };

    $scope.$on('pact:file-selected', function($event, dataUrl) {
        $scope.tempPicture = dataUrl;
    });

    $scope.camera = function() {
        $scope.showCamera = true;
    };

    $scope.selectPhoto = function(photo) {
        ImageService
            .loadImage('/api/proxy?url=' + encodeURIComponent(photo.source))
            .then(ImageService.getDataUrl)
            .then(function(dataUrl) {
                $scope.tempPicture = dataUrl;
            })
            .catch(function(err) {
                console.error('Error loading profile picture', err);
            });
    };

    $scope.loadProfilePhotos = function() {
        FacebookService.getProfilePhotos().then(function(photos) {
            $scope.profilePhotos = photos.slice(0, 4);
        }).catch(function(err) {
            console.error(err);
        });
    };

    $scope.$on('pact:camera-done', function($event, dataUrl) {
        $scope.showCamera = false;
        $scope.tempPicture = dataUrl;
    });

    $scope.$on('pact:camera-cancel', function() {
        $scope.showCamera = false;
    });

    $scope.loadProfilePhotos();
};