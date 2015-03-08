"use strict";

module.exports = /*@ngInject*/ function($q, GlFxService) {
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

        createBlankCanvas: function(width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            return canvas;
        },

        createImageCanvas: function(img) {
            var canvas = this.createBlankCanvas(img.width, img.height);

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            return canvas;
        },

        applyTransformation: function(dataUrl, faces) {
            return this.loadImage(dataUrl)
                .then(function(img) {
                    var canvas = GlFxService.canvas();
                    var texture = canvas.texture(img);

                    canvas.draw(texture);

                    faces.forEach(function(face) {
                        canvas.bulgePinch(face.eye_left.x, face.eye_left.y, 50, 0.8);
                        canvas.bulgePinch(face.eye_right.x, face.eye_right.y, 50, 0.8);
                    });

                    canvas.update();

                    return canvas.toDataURL('image/png');
                }).catch(function() {
                    return dataUrl;
                });
        },

        getDataUrl: function(img) {
            return this.createImageCanvas(img).toDataURL('image/png');
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