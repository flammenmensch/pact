"use strict";

angular.module('pact.services', [ ])
    .factory('FacePlusPlusService', require('./services/face-plus-plus-service'))
    .factory('FacebookService', require('./services/facebook-service'));

angular.module('pact.directives', [ ])
    .directive('ptSite', require('./directives/site'))
    .directive('ptScreen', require('./directives/screen'))
    .directive('fbButton', require('./directives/fb-button'))
    .directive('ptHeader', require('./directives/header'))
    .directive('ptFooter', require('./directives/footer'));

angular.module('pact.controllers', [ ])
    .controller('WelcomeScreenCtrl', require('./controllers/welcome-screen'))
    .controller('ChoosePhotoCtrl', require('./controllers/choose-photo'))
    .controller('MainCtrl', require('./controllers/main'));

angular.module('pact', [ 'ngAnimate', 'pact.services', 'pact.controllers', 'pact.directives' ])
    .run(function() {
        console.log('Application is up and running!');
    });