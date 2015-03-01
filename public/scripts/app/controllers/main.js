"use strict";

module.exports = /*@ngInject*/ function($scope, UserModel, FacebookService) {
    var WELCOME_SCREEN = 0;
    var MAIN_SCREEN = 1;

    $scope.screenIndex = -1;

    function setScreenIndex(index) {
        $scope.screenIndex = index;
    }

    function updateLogin(user) {
        UserModel.setUser(user);

        setScreenIndex(MAIN_SCREEN);
    }

    $scope.$on('pact:loggedIn', function($event, user) {
        updateLogin(user);
    });

    FacebookService
        .isLoggedIn()
        .then(updateLogin)
        .catch(function() {
            $scope.screenIndex = WELCOME_SCREEN;
        })
        .finally(function() {
            $scope.loading = false;
        });
};