"use strict";

angular.module('pact.services', [ ])
    .factory('FaceDetectionService', require('./services/face-detection-service'))
    .factory('FacebookService', require('./services/facebook-service'))
    .factory('ImageService', require('./services/image-service'));

angular.module('pact.models', [ ])
    .factory('UserModel', require('./models/user-model'))
    .factory('PictureModel', require('./models/picture-model'));

angular.module('pact.directives', [ ])
    .directive('ptLoadingButton', require('./directives/loading-button'))
    .directive('ptLoader', require('./directives/loader'))
    .directive('ptCanvas', require('./directives/canvas'));

angular.module('pact.controllers', [ 'pact.models', 'pact.services' ])
    .controller('WelcomeScreenCtrl', require('./controllers/welcome-screen'))
    .controller('MainScreenCtrl', require('./controllers/main-screen'))
    .controller('ShareCtrl', require('./controllers/share'))
    .controller('KnowFutureCtrl', require('./controllers/know-future'))
    .controller('PictureCtrl', require('./controllers/picture'))
    .controller('ChangePhotoCtrl', require('./controllers/change-photo'))
    .controller('AppCtrl', require('./controllers/main'));

angular.module('pact', [ 'ngAnimate', 'pact.controllers', 'pact.directives' ])
    .run(function() {
        console.log('Application is up and running!');
    });