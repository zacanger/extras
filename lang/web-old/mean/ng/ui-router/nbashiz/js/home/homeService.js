angular.module('nbaRoutes')

.service('homeService', function ($http, $q, teamService) {
  this.getAllData = function () {
    var deferred  = $q.defer()
      , teamData  = {}

    teamService.getTeamData('utahjazz')
    .then(function (data) {
      teamData['utahjazz'] = data
      teamService.getTeamData('losangeleslakers')
      .then(function (data) {
        teamData['losangeleslakers'] = data
        teamService.getTeamData('miamiheat')
        .then(function (data) {
          teamData['miamiheat'] = data
          deferred.resolve(teamData)
        })
      })
    })
    return deferred.promise
  }
})

