"use strict";

module.exports = /*@ngInject*/ function($q) {
    return {
        loadImage: function(url) {
            return $q(function(resolve) {
                var img = new Image();
                img.src = url;
                img.onload = function() {
                    resolve(this);
                };
            });
        },

        applyTransformation: function(dataUrl, positions) {

            return dataUrl;
        },

        getDataUrl: function(img) {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            return canvas.toDataURL('image/png');
        },

        getBlob: function(dataUrl) {
            var binary = atob(dataUrl.split(',')[1]);
            var array = [ ];

            for (var i = 0, n = binary.length; i < n; i++) {
                array.push(binary.charCodeAt(i));
            }

            return new Blob([ new Uint8Array(array)], { type: 'image/jpeg' });
        }
    }
};