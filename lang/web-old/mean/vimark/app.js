'use strict'

angular.module('vimark', [
  'angular-ladda',
  'ui.router',
  'firebase'
])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
      })
      .state('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
      })
      .state('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
      })
      .state('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
      })

    $urlRouterProvider
      .otherwise('/home')
  }])
