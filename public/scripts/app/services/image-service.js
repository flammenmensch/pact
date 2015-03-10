"use strict";

module.exports = /*@ngInject*/ function($q, GlFxService) {

    var MAX_WIDTH = 512;
    var MAX_HEIGHT = 512;

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
        var width = img.width, height = img.height, ratio = 1.0;

        if (img.width > MAX_WIDTH) {
            ratio = MAX_WIDTH / img.width;
            width = MAX_WIDTH;
            height = img.height * ratio;
        }

        if (img.height > MAX_HEIGHT) {
            ratio = MAX_HEIGHT / img.height;
            width = img.width * ratio;
            height = MAX_HEIGHT;
        }

        var canvas = createBlankCanvas(width, height);
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);

        return canvas;
    }

    function applyBulgeFilter(img, faces) {
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

        var dataUrl = canvas.toDataURL('image/png');

        texture.destroy();

        return dataUrl;
    }

    function applyTransformation(dataUrl, faces) {
        return loadImage(dataUrl)
            .then(function(img) {
                return applyBulgeFilter(img, faces);
            })
            .then(loadImage)
            .then(function(bulgedImg) {
                return loadImage('images/watermark.png').then(function(watermarkImg) {
                    var canvas = createBlankCanvas(bulgedImg.width, bulgedImg.height);
                    var ctx = canvas.getContext('2d');

                    ctx.drawImage(bulgedImg, 0, 0);
                    ctx.drawImage(watermarkImg, canvas.width - watermarkImg.width, canvas.height - watermarkImg.height - 20);

                    return canvas.toDataURL('image/png');
                });
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