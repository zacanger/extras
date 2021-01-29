angular.module('nbaRoutes', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('httpRequestInterceptor')

  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url         : '/'
  , controller  : 'homeCtrl'
  , templateUrl : 'js/home/homeTmpl.html'
  , resolve     : {
      allData   : function ($stateParams, homeService) {
        return homeService.getAllData()
      }
    }
  })

  .state('teams', {
    url         : '/teams/:team'
  , controller  : 'teamCtrl'
  , templateUrl : 'js/teams/teamTmpl.html'
  , resolve     : {
      teamData  : function ($stateParams, teamService) {
        return teamService.getTeamData($stateParams.team)
      }
    }
  })

})

