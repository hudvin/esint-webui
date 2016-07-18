(function() {
  'use strict';

  angular
    .module('proj')
    .controller('UploadController', UploadController);


  /** @ngInject */
  function UploadController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1468579325442;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();


// (function () {
//     'use strict';
//
//
//
//     var isOnGitHub = window.location.hostname === 'blueimp.github.io',
//         url = isOnGitHub ? '//jquery-file-upload.appspot.com/' : '/api/imageUpload';
//
//     angular.module('proj', [
//
//     ])
//         .config([
//             '$httpProvider', 'fileUploadProvider',
//             function ($httpProvider, fileUploadProvider) {
//                 delete $httpProvider.defaults.headers.common['X-Requested-With'];
//                 fileUploadProvider.defaults.redirect = window.location.href.replace(
//                     /\/[^\/]*$/,
//                     '/cors/result.html?%s'
//                 );
//                 if (isOnGitHub) {
//                     // Demo settings:
//                     angular.extend(fileUploadProvider.defaults, {
//                         // Enable image resizing, except for Android and Opera,
//                         // which actually support image resizing, but fail to
//                         // send Blob objects via XHR requests:
//                         disableImageResize: /Android(?!.*Chrome)|Opera/
//                             .test(window.navigator.userAgent),
//                         maxFileSize: 5000000,
//                         acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
//                     });
//                 }
//             }
//         ])
//
//         .controller('DemoFileUploadController', [
//             '$scope', '$http', '$filter', '$window',
//             function ($scope, $http) {
//                 $scope.options = {
//                     url: url
//                 };
//
//                 $scope.setCover = function () {
//
//                     var fileId;
//                     $('input[type="radio"]').each(function () {
//                         if ($(this).is(":checked")) { fileId = $(this).attr('id'); }
//                     });
//
//                     return $http({
//                         url: "/home/SetCoverImage/?fileId=" + fileId,
//                         method: "post"
//                     }).then(
//                            function () {
//                                console.log("succcess");
//                            },
//                            function () {
//                                console.log("error");
//                            }
//                        );
//                 };
//
//
//             }
//         ])
//
//         .controller('FileDestroyController', [
//             '$scope', '$http',
//             function ($scope, $http) {
//                 var file = $scope.file,
//                     state;
//
//
//                 if (file.name) {
//
//
//
//                     file.$destroy = function () {
//
//                         state = 'pending';
//                         return $http({
//                             url: "/api/imageupload/?id=" + file.id,
//                             method: "delete"
//                         }).then(
//                             function () {
//                                 state = 'resolved';
//                                 $scope.clear(file);
//                             },
//                             function () {
//                                 state = 'rejected';
//                             }
//                         );
//                     };
//
//                     file.$cancel = function () {
//                         console.log("cancel individual");
//                         $scope.clear(file);
//                     };
//                 }
//
//             }
//         ]);
//
// }());
