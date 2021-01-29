angular.module('nbaRoutes')

.controller('homeCtrl', function ($scope, $stateParams, homeService, allData) {

  $scope.jazzData  = allData['utahjazz']
  $scope.lakerData = allData['losangeleslakers']
  $scope.heatData  = allData['miamiheat']

})

