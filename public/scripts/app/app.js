"use strict";

angular.module('pact.services', [ ])
    .factory('FaceDetectionService', require('./services/face-detection-service'))
    .factory('FacebookService', require('./services/facebook-service'))
    .factory('ImageService', require('./services/image-service'))
    .factory('GlFxService', require('./services/glfx-service'));

angular.module('pact.models', [ ])
    .factory('UserModel', require('./models/user-model'))
    .factory('PictureModel', require('./models/picture-model'));

angular.module('pact.directives', [ ])
    .directive('ptChoosePhotoButton', require('./directives/choose-photo-button'))
    .directive('ptLoadingButton', require('./directives/loading-button'))
    .directive('ptLoader', require('./directives/loader'))
    .directive('ptVideoComponent', require('./directives/video-component'))
    .directive('ptCanvas', require('./directives/canvas'))
    .directive('ptDropdown', require('./directives/dropdown'));

angular.module('pact.controllers', [ 'pact.models', 'pact.services' ])
    .controller('WelcomeScreenCtrl', require('./controllers/welcome-screen'))
    .controller('MainScreenCtrl', require('./controllers/main-screen'))
    .controller('ShareCtrl', require('./controllers/share'))
    .controller('KnowFutureCtrl', require('./controllers/know-future'))
    .controller('PictureCtrl', require('./controllers/picture'))
    .controller('ChangePhotoCtrl', require('./controllers/change-photo'))
    .controller('PopupCtrl', require('./controllers/popup'))
    .controller('CameraScreenCtrl', require('./controllers/camera-screen'))
    .controller('AlbumsScreenCtrl', require('./controllers/albums-screen'))
    .controller('AppCtrl', require('./controllers/main'));

angular.module('pact', [ 'ngAnimate', 'ngDialog', 'pact.controllers', 'pact.directives' ])
    .run(/*@ngInject*/function($rootScope) {
        angular.element(document).on('click', function(event) {
            $rootScope.$broadcast('pact:document-clicked', angular.element(event.target));
        });
    })
    .run(function() {
        console.log('Application is up and running!');
    });