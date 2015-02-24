"use strict";

module.exports = /*@ngInject*/ function($scope, FacebookService) {

    $scope.loading = false;

    function notifyLoggedIn(profile) {
        $scope.$emit('pact:loggedIn', profile);
    }

    $scope.signIn = function() {
        $scope.loading = true;

        FacebookService
            .login()
            .then(notifyLoggedIn)
            .finally(function() {
                $scope.loading = false;
            });
    };
};