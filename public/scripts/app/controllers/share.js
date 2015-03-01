"use strict";

module.exports = /*@ngInject*/ function($scope, PictureModel, ImageService, FacebookService) {
    $scope.sharing = false;

    $scope.share = function() {
        $scope.sharing = true;

        var binary = ImageService.getBlob(PictureModel.picture);

        FacebookService
            .share(binary)
            .catch(function(err) {
                $scope.$emit('pact:error', err);
            })
            .finally(function() {
                $scope.sharing = false;
            });
    };
};