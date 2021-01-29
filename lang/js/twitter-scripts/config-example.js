const d = new Date()
d.setMonth(d.getMonth() - 1)

module.exports = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
  maxDate: d, // delete older than this eg: '2011-12-31 00:00:00 +0000'
  saveRegexp: [/keybase/ig], // save tweets matching this regexp: eg ['#newavatar', '@\w+']
  callsInterval: 250 // ms
}
