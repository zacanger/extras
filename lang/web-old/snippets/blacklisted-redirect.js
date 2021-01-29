// i dislike you
;(function () {
  var redirect_to = 'http://lmgtfy.com/?q=cache%3Almgtfy.com+Never+gonna+give+you+up+Never+gonna+let+you+down',
    blacklisted = ['asshole.url', 'annoyingfuck.tumblr.com', 'person.that.i.dislike.is.you', 'etc.etc'],
    referrer_components = null,
    base_ref_url = null
  if (document.referrer) {
    referrer_components = document.referrer.split('/')
    base_ref_url = referrer_components
    if (blacklisted.indexOf(base_ref_url) > -1) {
      // what... you mad?
      window.location.replace(redirect_to)
    }
  }
})()
