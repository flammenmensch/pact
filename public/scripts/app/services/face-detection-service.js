"use strict";

module.exports = /*@ngInject*/ function($http) {
    var API_KEY = 'iTws8iNv6Dmshk9wEVL928XQiGHUp10O4tJjsncFPVhwdTMccN';
    var API_URL = 'https://lambda-face-recognition.p.mashape.com/detect';

    return {
        detectFace: function(binary) {
            var fd = new FormData();
            fd.append('files', binary);

            return $http.post(API_URL, fd, {
                headers: {
                    'X-Mashape-Key': API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': undefined
                }
            });
        }
    };
};