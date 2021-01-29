'use strict'

angular.module('markvi')

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })

    $stateProvider.state('main', {
      url: '/',
      templateUrl: '/views/main.html',
      controller: 'MainCtrl'
    }).state('file', {
      url: '/:id',
      templateUrl: '/views/main.html',
      controller: 'MainCtrl'
    })
    $urlRouterProvider
			.otherwise('/')
  })

  .run(function ($rootScope) {
    $rootScope.isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())
  })
