"use strict";

module.exports = /*@ngInject*/ function($http) {
    var API_KEY = 'LFhiJkKBupmshHxtoQGtD9v4p0aZp1CZIJ2jsnlRcQnW2KhPG8';
    var API_URL = 'https://faceplusplus-faceplusplus.p.mashape.com/detection/detect';

    return {
        detectFace: function(url) {
            return $http.get(API_URL, {
                params: {
                    url: url
                },
                headers: {
                    'X-Mashape-Key': API_KEY,
                    'Accept': 'application/json'
                }
            })
        }
    };
};