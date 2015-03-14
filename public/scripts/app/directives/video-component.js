"use strict";

module.exports = /*@ngInject*/ function($window, ImageService) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: '<video autoplay></video>',
        link: function(scope, element) {
            var stream = null;
            var video = element[0];

            $window.navigator.getUserMedia = ($window.navigator.getUserMedia || $window.navigator.webkitGetUserMedia || $window.navigator.mozGetUserMedia || $window.navigator.msGetUserMedia);

            if ($window.navigator.getUserMedia) {
                $window.navigator.getUserMedia({ video: true }, function(s) {
                    stream = s;
                    video.src = $window.URL.createObjectURL(stream);
                }, function(err) {
                    scope.$emit('pact:camera-error', err);
                });
            }

            scope.$on('pact:camera-shoot', function() {
                var canvas = ImageService.createBlankCanvas(video.videoWidth, video.videoHeight);

                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);

                scope.$emit('pact:camera-picture-taken', canvas.toDataURL('image/png'));
            });

            scope.$on('$destroy', function() {
                video.src = '';

                if (stream) {
                    $window.URL.revokeObjectURL(stream);

                    stream.stop();
                    stream = null;
                }
            });
        }
    };
};