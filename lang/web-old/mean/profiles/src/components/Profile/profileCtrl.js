export default function profileCtrl ($scope, profileService) {
  profileService.getProfiles()
  .then(profiles => $scope.profiles = profiles)
}

profileCtrl.$inject = ['$scope', 'profileService']
