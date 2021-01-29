var app = angular.module('mean-blog.home', ['ui.router',])

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/home/templates/main.html',
    controller: 'MainCtrl'
  })

  $urlRouterProvider.otherwise('/')
})

