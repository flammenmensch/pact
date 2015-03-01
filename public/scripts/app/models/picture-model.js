"use strict";

module.exports = function() {
    var __picture = null;

    function PictureModel() {}

    PictureModel.prototype = {
        get picture() {
            return __picture;
        },

        setPicture: function(data) {
            __picture = data;
        }
    };

    return new PictureModel();
};