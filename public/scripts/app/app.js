"use strict";

angular.module('pact.services', [ ])
    .factory('FaceDetectionService', require('./services/face-detection-service'))
    .factory('FacebookService', require('./services/facebook-service'))
    .factory('ImageService', require('./services/image-service'));

angular.module('pact.directives', [ ])
    .directive('ptCanvas', require('./directives/canvas'));

angular.module('pact.controllers', [ ])
    .controller('WelcomeScreenCtrl', require('./controllers/welcome-screen'))
    .controller('ChoosePhotoCtrl', require('./controllers/choose-photo'))
    .controller('MainCtrl', require('./controllers/main'));

angular.module('pact', [ 'ngAnimate', 'pact.services', 'pact.controllers', 'pact.directives' ])
    .run(function() {
        console.log('Application is up and running!');
    });