export default function profile () {
  return {
    restrict : 'E'
  , scope    : {profile : '='}
  , template : require('./profile.html')
  }
}
