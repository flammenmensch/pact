"use strict";

module.exports = function() {
    var __stream = null;

    function StreamModel() {}

    StreamModel.prototype = {
        get stream() {
            return __stream;
        },

        setStream: function(data) {
            __stream = data;
        }
    };

    return new StreamModel();
};