"use strict";

module.exports = /*@ngInject*/ function($http) {
    return {
        upload: function(url) {
            return $http.post('/api/upload', { picture: url });
        }
    };
};