(function() {
  'use strict';

  angular
    .module('proj')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('upload', {
        url: '/upload',
        templateUrl: 'app/upload/upload.html',
        controller: 'UploadController',
        controllerAs: 'upload'
      })
      .state('view', {
        url: '/view',
        templateUrl: 'app/view/view.html',
        controller: 'ViewController',
        controllerAs: 'view'
      })



    ;

    $urlRouterProvider.otherwise('/');
  }

})();
