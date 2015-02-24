"use strict";

module.exports = /*@ngInject*/ function($scope, FacebookService, FacePlusPlusService) {

    $scope.picture = '/api/proxy?url=' + encodeURIComponent($scope.user.picture.data.url);

    $scope.loading = false;

    $scope.faces = [ ];
    $scope.faceFound = false;
    $scope.error = false;

    $scope.knowFuture = function() {
        $scope.loading = true;

    };

    /*$scope.knowFuture = function() {
        $scope.loading = true;

        FacePlusPlusService.detectFace($scope.picture).then(function(response) {
            if (response.data.face.length > 0) {
                $scope.faces = response.data.face;
                $scope.faceFound = true;
                $scope.error = false;
            } else {
                $scope.faces = [ ];
                $scope.faceFound = false;
                $scope.error = true;
            }
        }).finally(function() {
            $scope.loading = false;
        });
    };*/

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
};