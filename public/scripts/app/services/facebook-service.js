"use strict";

module.exports = /*@ngInject*/ function($window, $q, $cacheFactory, $http) {
    var FB = $window.FB;
    var cache = $cacheFactory('facebook-cache');

    function createHandler(resolve, reject) {
        return function(response) {
            if (response.status === 'connected') {
                return FB.api('/me?fields=id,picture.type(large).width(379).height(379)', resolve);
            }

            reject(new Error('Not logged in'));
        }
    }

    function isLoggedIn() {
        return $q(function(resolve, reject) {
            FB.getLoginStatus(createHandler(resolve, reject));
        });
    }

    function login() {
        return $q(function(resolve, reject) {
            FB.login(createHandler(resolve, reject), { scope: 'publish_actions,user_photos' });
        });
    }

    function logout() {
        return $q(function(resolve) {
            FB.logout(resolve);
        });
    }

    function share(binary) {
        var token = FB.getAccessToken();
        var fd = new FormData();

        fd.append('access_token', token);
        fd.append('source', binary);
        fd.append('message', 'I\'m vigorous in the future');

        return $http.post('https://graph.facebook.com/me/photos?access_token=' + token, fd, {
            headers: {
                'Content-Type': undefined
            }
        });
    }

    function getUserAlbums() {
        var albums = cache.get('albums');

        return albums ? $q.when(albums) : $q(function(resolve, reject) {
            FB.api('/me/albums', function(response) {
                if (response.error) {
                    return reject(response.error);
                }

                var albums = response.data || [ ];
                cache.put('albums', albums);

                resolve(albums);
            });
        });
    }

    function getProfileAlbum(albums) {
        var album, current;

        for (var i = 0, n = albums.length; i < n; i++) {
            current = albums[i];

            if (current.type === 'profile' && current.name === 'Profile Pictures') {
                album = current;
                break;
            }
        }

        if (!album) {
            return $q.reject(new Error('Album not found'));
        }

        return $q.when(album);
    }

    function getAlbumPhotos(album) {
        return $q(function(resolve, reject) {
            FB.api('/' + album.id + '/photos', function(response) {
                if (response.error) {
                    return reject(response.error);
                }

                resolve(response.data || []);
            });
        });
    }

    function getProfilePhotos() {
        var photos = cache.get('profilePhotos');

        return photos ? $q.when(photos) : getUserAlbums()
            .then(getProfileAlbum)
            .then(getAlbumPhotos)
            .then(function(photos) {
                cache.put('profilePhotos', photos);
                return photos;
            });
    }

    function getFourProfilePhotos() {
        return getProfilePhotos().then(function(photos) {
            return photos.slice(0, 4);
        });
    }

    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        share: share,
        getUserAlbums: getUserAlbums,
        getProfileAlbum: getProfileAlbum,
        getAlbumPhotos: getAlbumPhotos,
        getProfilePhotos: getProfilePhotos,
        getFourProfilePhotos: getFourProfilePhotos
    };
};