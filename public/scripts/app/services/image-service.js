"use strict";

module.exports = /*@ngInject*/ function($q, GlFxService) {

    function loadImage(url) {
        return $q(function(resolve) {
            var img = new Image();
            img.src = url;
            img.onload = function() {
                resolve(this);
            };
        });
    }

    function createBlankCanvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        return canvas;
    }

    function createImageCanvas(img) {
        var canvas = createBlankCanvas(img.width, img.height);

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        return canvas;
    }

    function applyTransformation(dataUrl, faces) {
        return loadImage(dataUrl)
            .then(function(img) {
                var canvas = GlFxService.canvas();
                var texture = canvas.texture(img);

                canvas.draw(texture);

                faces.forEach(function(face) {
                    if (face.hasOwnProperty('eye_left')) {
                        canvas.bulgePinch(face.eye_left.x, face.eye_left.y, 30, 0.5);
                    }

                    if (face.hasOwnProperty('eye_right')) {
                        canvas.bulgePinch(face.eye_right.x, face.eye_right.y, 30, 0.5);
                    }
                });

                canvas.update();

                return canvas.toDataURL('image/png');
            }).catch(function() {
                return dataUrl;
            });
    }

    function getDataUrl(img) {
        return createImageCanvas(img).toDataURL('image/png');
    }

    function getBlob(dataUrl) {
        var binary = atob(dataUrl.split(',')[1]);
        var array = [ ];

        for (var i = 0, n = binary.length; i < n; i++) {
            array.push(binary.charCodeAt(i));
        }

        return new Blob([ new Uint8Array(array)], { type: 'image/jpeg' });
    }

    return {
        loadImage: loadImage,
        createBlankCanvas: createBlankCanvas,
        createImageCanvas: createImageCanvas,
        applyTransformation: applyTransformation,
        getDataUrl: getDataUrl,
        getBlob: getBlob
    }
};