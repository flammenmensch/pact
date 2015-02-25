"use strict";

module.exports = /*@ngInject*/ function($document) {
    return {
        restrict: 'E',
        replace: true,
        template: '<img>',
        scope: {
            url: '@',
            faces: '='
        },
        link: function(scope, element) {
            var originalImageData,
                canvas = $document[0].createElement('canvas'),
                context = canvas.getContext('2d');

            function reset() {
                if (originalImageData !== undefined) {
                    context.putImageData(originalImageData, 0, 0);
                }
            }

            function drawImageToCanvas(img) {
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                return context.getImageData(0, 0, canvas.width, canvas.height);
            }

            function applyFilter(width, height, px,py) {
                var x = px-width/2;
                var y = py-height/2;
                var r = Math.sqrt(x*x+y*y);
                var maxr = width/2;
                if (r>maxr) return {
                    'x':px,
                    'y':py
                }
                var a = Math.atan2(y,x);
                var k = (r/maxr)*(r/maxr)*0.5+0.5;
                var dx = Math.cos(a)*r*k;
                var dy = Math.sin(a)*r*k;

                return {
                    'x': dx+width/2,
                    'y': dy+height/2
                }
            }

            element.on('load', function() {
                originalImageData = drawImageToCanvas(this);
            });

            scope.$watch('url', function(newValue) {
                if (newValue !== undefined) {
                    var img = element[0];
                    img.src = newValue;
                }
            });

            scope.$watch('faces', function(newValue) {
                if (newValue !== undefined && newValue.length > 0) {
                    console.log(newValue);
                } else {
                    reset();
                }
            })
        }
    }
};