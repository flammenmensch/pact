"use strict";

module.exports = /*@ngInject*/ function($scope, FacebookService, ImageService, FaceDetectionService) {
    $scope.picture = undefined;

    $scope.loading = true;

    $scope.faces = [ ];
    $scope.faceFound = false;
    $scope.error = false;

    $scope.knowFuture = function() {
        $scope.loading = true;

        var binary = ImageService.getBlob($scope.picture);

        FacePlusPlusService.detectFace(binary).then(function(response) {
            if (!response.data.photos || response.data.photos.length === 0) {
                throw new Error('Server error');
            }

            if (response.data.photos[0].tags.length === 0) {
                throw new Error('No faces detected');
            }

            $scope.faces = response.data.photos[0].tags;
            $scope.faceFound = true;
            $scope.error = false;
        }).catch(function() {
            $scope.faces = [ ];
            $scope.faceFound = false;
            $scope.error = true;
        }).finally(function() {
            $scope.loading = false;
        });
    };

    $scope.shareIt = function() {
        FacebookService.share();
    };

    $scope.tryAgain = function() {
        $scope.faces = [ ];
        $scope.faceFound = false;
        $scope.error = false;
    };

    $scope.changePhoto = function() {
        console.log('Change photo click')
    };

    ImageService
        .loadImage('/api/proxy?url=' + encodeURIComponent('http://images.wisegeek.com/triangular-face.jpg'/*$scope.user.picture.data.url*/))
        .then(ImageService.getDataUrl)
        .then(function(dataUrl) {
            $scope.picture = dataUrl;
            $scope.loading = false;
        });
};