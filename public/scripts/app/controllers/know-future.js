"use strict";

module.exports = /*@ngInject*/ function($scope, PictureModel, ImageService, FaceDetectionService) {
    $scope.loading = false;

    $scope.knowFuture = function() {
        $scope.loading = true;

        var binary = ImageService.getBlob(PictureModel.picture);

        FaceDetectionService.detectFace(binary).then(function(response) {
            if (!response.data.photos || response.data.photos.length === 0) {
                throw new Error('Server error');
            }

            if (response.data.photos[0].tags.length === 0) {
                throw new Error('No faces detected');
            }
        }).catch(function() {
            console.error('Error detecting face', err);
            $scope.$emit('pact:error', err);
        }).finally(function() {
            $scope.loading = false;
        });
    };
};