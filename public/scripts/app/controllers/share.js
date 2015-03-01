"use strict";

module.exports = /*@ngInject*/ function($scope, PictureModel, ImageService, FacebookService) {
    var self = this;
    self.loading = false;

    $scope.share = function() {
        var binary = ImageService.getBlob(PictureModel.picture);

        self.sharing = true;

        FacebookService
            .share(binary)
            .catch(function(err) {
                console.error('Error sharing photo', err);
            })
            .finally(function() {
                self.sharing = false;
            });
    };
};