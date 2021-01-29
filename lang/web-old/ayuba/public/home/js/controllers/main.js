app
.controller('MainCtrl', ($scope, $mdSidenav, $mdUtil, $log) => {
  $scope.toggleRight = buildToggler('right')
  function buildToggler(navID){
    const debounceFn = $mdUtil.debounce(() => {
      $mdSidenav(navID)
      .toggle()
      .then(() => {
        $log.debug(`toggle ${navID} is done`)
      })
    }, 300)
    return debounceFn
  }
})

.controller('SidenavCtrl', ($scope, $mdSidenav, $log) => {
  $scope.close = () => {
    $mdSidenav('right').close()
    .then(function(){
      $log.debug('close RIGHT is done')
    })
  }
})

