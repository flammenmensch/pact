"use strict";

module.exports = /*@ngInject*/ function($scope, FacebookService) {

    $scope.screenIndex = -1;

    $scope.user = null;

    function setScreenIndex(index) {
        $scope.screenIndex = index;
    }

    function updateLogin(user) {
        $scope.user = user;

        setScreenIndex(1);
    }

    $scope.$on('pact:loggedIn', function($event, user) {
        updateLogin(user);
    });

    FacebookService
        .isLoggedIn()
        .then(updateLogin)
        .catch(function() {
            $scope.screenIndex = 0;
        })
        .finally(function() {
            $scope.loading = false;
        });
};