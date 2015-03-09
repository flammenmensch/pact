"use strict";

module.exports = /*@ngInject*/ function($scope, ngDialog) {
    $scope.changePhoto = function() {
        var popup = ngDialog.open({
            template: 'popup',
            className: 'popup',
            controller: 'PopupCtrl'
        });

        popup.closePromise.then(function(data) {
            if (data.value !== '$document' && data.value !== '$closeButton' && data.value !== undefined) {
                $scope.$emit('pact:photo-changed', data.value); // DataUrl
            }
        });
    };
};