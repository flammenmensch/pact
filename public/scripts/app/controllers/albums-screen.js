"use strict";

module.exports = /*@ngInject*/ function($scope, ImageService, FacebookService) {
    $scope.loading = false;

    $scope.albums = [ ];
    $scope.selectedAlbum = null;

    $scope.photos = [ ];
    $scope.selectedPhoto = null;

    $scope.back = function() {
        $scope.$emit('pact:albums-cancel');
    };

    $scope.done = function() {
        ImageService
            .loadImage('/api/proxy?url=' + encodeURIComponent($scope.selectedPhoto.source))
            .then(ImageService.getDataUrl)
            .then(function(dataUrl) {
                $scope.$emit('pact:albums-done', dataUrl);
            });
    };

    $scope.isEmpty = function() {
        return $scope.photos && $scope.photos.length === 0;
    };

    $scope.select = function(photo) {
        $scope.selectedPhoto = photo;
    };

    $scope.loadAlbums = function() {
        FacebookService.getUserAlbums().then(function(albums) {
            $scope.albums = albums;
            $scope.selectAlbumByIndex(0);
        });
    };

    $scope.loadPhotos = function() {
        $scope.loading = true;

        FacebookService.getAlbumPhotos($scope.selectedAlbum).then(function(photos) {
            $scope.photos = photos;
            $scope.selectPhotoByIndex(0);
        }).finally(function() {
            $scope.loading = false;
        });
    };

    $scope.selectAlbumByIndex = function(index) {
        if ($scope.albums[index]) {
            $scope.selectedAlbum = $scope.albums[index];
            $scope.loadPhotos();
        }
    };

    $scope.selectPhotoByIndex = function(index) {
        if ($scope.photos[index]) {
            $scope.selectedPhoto = $scope.photos[index];
        }
    };

    $scope.$watch('selectedAlbum', function(newValue) {
        if (newValue) {
            $scope.loadPhotos();
        }
    });

    $scope.loadAlbums();
};