export default function rootCtrl ($scope, profileService) {
  profileService.getProfiles()
  .then(profiles => $scope.profiles = profiles)
}

rootCtrl.$inject = ['$scope', 'profileService']
