"use strict";

module.exports = /*@ngInject*/ function($window, $q, $http) {
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

        share: function(binary) {
            var token = FB.getAccessToken();
            var fd = new FormData();

            fd.append('access_token', token);
            fd.append('source', binary);
            fd.append('message', 'I\'m vigorous in the future');

            return $http.post('https://graph.facebook.com/me/photos?access_token=' + token, fd, {
                headers: {
                    'Content-Type': undefined
                }
            });
        }
    };
};