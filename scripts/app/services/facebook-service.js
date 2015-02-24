"use strict";

module.exports = /*@ngInject*/ function($window, $q) {
    var FB = $window.FB;

    function createHandler(resolve, reject) {
        return function(response) {
            if (response.status === 'connected') {
                return FB.api('/me?fields=id,picture.type(large)', resolve);
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
                FB.login(createHandler(resolve, reject));
            });
        },

        logout: function() {
            return $q(function(resolve) {
                FB.logout(resolve);
            });
        },

        share: function() {
            return $q(function(resolve, reject) {
                FB.ui({
                    method: 'share',
                    href: 'http://pact-coffee.herokuapp.com'
                }, function(response) {
                    if (response && !response.error_code) {
                        return resolve(true);
                    }

                    reject(new Error('Could not share'));
                })
            });
        }
    };
};