"use strict";

module.exports = /*@ngInject*/ function($window, ImageService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="popup-button-wrapper"><button id="choosePhoto" class="popup-button">+ Choose photo</button><input accept="image/jpeg,image/png,image/gif" id="fileInput" type="file" style="display: none"></div>',
        link: function(scope, element) {
            var choosePhoto = element.find('button')[0];
            var inputFile = element.find('input')[0];

            inputFile.addEventListener('change', function(event) {
                var objectUrl = $window.URL.createObjectURL(event.target.files[0]);

                ImageService.loadImage(objectUrl).then(ImageService.getDataUrl).then(function(dataUrl) {
                    scope.$emit('pact:file-selected', dataUrl);
                }).finally(function() {
                    $window.URL.revokeObjectURL(objectUrl);
                });
            });

            choosePhoto.addEventListener('click', function() {
                inputFile.click();
            });
        }
    };
};