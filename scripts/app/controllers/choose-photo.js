"use strict";

module.exports = /*@ngInject*/ function($scope, FacebookService, FacePlusPlusService) {

    $scope.picture = 'http://www.short-haircut.com/wp-content/uploads/2013/04/Short-haircut-for-round-face.jpg';
        //$scope.user.picture.data.url;

    $scope.loading = false;

    $scope.faceFound = false;
    $scope.error = false;

    $scope.knowFuture = function() {
        $scope.loading = true;

        FacePlusPlusService.detectFace($scope.picture).then(function(response) {
            if (response.data.face.length > 0) {
                $scope.faceFound = true;
                $scope.error = false;
            } else {
                $scope.faceFound = false;
                $scope.error = true;
            }
        }).finally(function() {
            $scope.loading = false;
        });
    };

    $scope.shareIt = function() {
        FacebookService.share();
    };

    $scope.tryAgain = function() {
        $scope.faceFound = false;
        $scope.error = false;
    };

    $scope.changePhoto = function() {
        console.log('Change photo click')
    };
};