const $broadcast = (event: string, ...args: any[]) => {
  angular.element('body').injector().invoke([
    '$rootScope',
    '$timeout',
    ($rootScope, $timeout) => {
      args.unshift(event)
      $timeout(() => {
        $rootScope.$broadcast.apply($rootScope, args)})}])}

// usage:
sellerApp.$broadcast(eventName, { some: payload }, { maybe: more })
