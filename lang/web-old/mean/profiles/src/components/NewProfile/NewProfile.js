export default function newProfile() {
  return {
    restrict   : 'E'
  , scope      : {}
  , template   : require('./newProfile.html')
  , controller : 'newProfileCtrl'
  }
}
