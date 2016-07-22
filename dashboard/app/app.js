;(function () {
    'use strict';

    var url = "http://127.0.0.1:8080/image/";
    var isOnGitHub = false;

    angular.module('myApp', ['ui.router',
        'blueimp.fileupload'
    ])

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/upload');
            $stateProvider
                .state('upload', {
                    url: '/upload',
                    templateUrl: 'upload/upload-view.html'
                })
                .state('gallery', {
                    url: '/gallery',
                    templateUrl: 'gallery/gallery-view.html'
                })
            ;
        }, [
            '$httpProvider', 'fileUploadProvider',
            function ($httpProvider, fileUploadProvider) {
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                fileUploadProvider.defaults.redirect = window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                );
                if (isOnGitHub) {
                    angular.extend(fileUploadProvider.defaults, {
                        // Enable image resizing, except for Android and Opera,
                        // which actually support image resizing, but fail to
                        // send Blob objects via XHR requests:
                        disableImageResize: /Android(?!.*Chrome)|Opera/
                            .test(window.navigator.userAgent),
                        maxFileSize: 999000,
                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
                    });
                }
            }
        ])


        .controller("GalleryController", function ($scope, $http) {
            $scope.deleteImage = function deleteImage(index) {

                var image = $scope.images.files[index]
                var deleteUrl = image.deleteUrl

                $http.delete(deleteUrl).success(function (data, status, headers, config) {
                    // $scope.images = data;

                    $scope.images.files.splice(index, 1);

                }).error(function (data, status, headers, config) {
                    console.log(status)
                });

            };

            $http.get('http://127.0.0.1:8080/images/').success(function (data, status, headers, config) {
                $scope.images = data;
            }).error(function (data, status, headers, config) {
                console.log(status)
            });
        })
        .controller('DemoFileUploadController', [
            '$scope', '$http', '$filter', '$window',
            function ($scope, $http) {
                $scope.options = {
                    url: url
                };
                if (!isOnGitHub) {
                    $scope.loadingFiles = true;
                    $http.get(url)
                        .then(
                            function (response) {
                                $scope.loadingFiles = false;
                                $scope.queue = response.data.files || [];
                            },
                            function () {
                                $scope.loadingFiles = false;
                            }
                        );
                }
            }
        ])

        .controller('FileDestroyController', [
            '$scope', '$http',
            function ($scope, $http) {
                var file = $scope.file,
                    state;
                if (file.url) {
                    file.$state = function () {
                        return state;
                    };
                    file.$destroy = function () {
                        state = 'pending';
                        return $http({
                            url: file.deleteUrl,
                            method: file.deleteType
                        }).then(
                            function () {
                                state = 'resolved';
                                $scope.clear(file);
                            },
                            function () {
                                state = 'rejected';
                            }
                        );
                    };
                } else if (!file.$cancel && !file._index) {
                    file.$cancel = function () {
                        $scope.clear(file);
                    };
                }
            }
        ]);

}());