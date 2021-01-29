const app = angular.module('ayuba.home', [
  'ui.router',
  'ngMaterial'
])

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('home', {
    url         : '/'
  , templateUrl : '/home/templates/main.html'
  , controller  : 'MainCtrl'
  })
  $urlRouterProvider.otherwise('/')
})

