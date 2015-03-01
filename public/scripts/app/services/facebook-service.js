"use strict";

module.exports = /*@ngInject*/ function($window, $q) {
    var FB = $window.FB;

    function createHandler(resolve, reject) {
        return function(response) {
            if (response.status === 'connected') {
                return FB.api('/me?fields=id,picture.type(large).width(379).height(379)', resolve);
            }

            reject(new Error('Not logged in'));
        }
    }

    return {
        isLoggedIn: function() {
            return $q(function(resolve, reject) {
                FB.getLoginStatus(createHandler(resolve, reject));
            });
        },

        login: function() {
            return $q(function(resolve, reject) {
                FB.login(createHandler(resolve, reject), { scope: 'publish_actions' });
            });
        },

        logout: function() {
            return $q(function(resolve) {
                FB.logout(resolve);
            });
        },

        share: function(image) {
            return $q(function(resolve, reject) {
                FB.api('/me/photos', 'post', { source: image }, function(response) {
                    if (response && !response.error_code) {
                        return resolve(true);
                    }

                    reject(new Error('Could not share'));
                });
            });
        }
    };
};