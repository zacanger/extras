'use strict'

const
  bodyparser        = require('bodyparser')
, cookieparser      = require('cookie-parser')
, csurf             = require('csurf')
, express           = require('express')
, extend            = require('extend')
, forms             = require('forms')
, collectFormErrors = require('express-stormpath/lib/helpers').collectFormErrors
, router            = express.Router()

const profileForm = forms.create({
  givenName     : forms.fields.string({required : true})
, surname       : forms.fields.string({required : true})
, streetAddress : forms.fields.string()
, city          : forms.fields.string()
, state         : forms.fields.string()
, zip           : forms.fields.string()
})

function renderForm(req, res, locals){
  res.render('profile', extend({
    title         : 'profile'
  , csrfToken     : req.csrfToken()
  , givenName     : req.user.givenName
  , surname       : req.user.surname
  , streetAddress : req.user.customData.streetAddress
  , city          : req.user.customData.city
  , state         : req.user.customData.state
  , zip           : req.user.customData.zip
  }, locals || {} ))
}

module.exports = function profile(){
  router
  .use(cookieparser())
  .use(bodyparser.urlencoded({extended : true}))
  .use(csurf({cookie : true}))

  .all('/', (req, res) => {
    profileForm.handle(req, {
      sucess(form){
        req.user.givenName                = form.data.givenName
        req.user.surname                  = form.data.surname
        req.user.customData.streetAddress = form.data.streetAddress
        req.user.customData.city          = form.data.city
        req.user.customData.state         = form.data.state
        req.user.customData.zip           = form.data.zip
        req.use.save(err => {
          if(err){
            if(err.developerMessage){
              console.error(err)
            }
            renderForm(req, res, {
              errors : [{
                error : err.userMessage || err.message || String(err)
              }]
            })
          } else {
            renderForm(req, res, {saved : true})
          }
        })
      },

      error(form){
        renderForm(req, res, {errors : collectFormErrors(form)})
      },

      empty(){
        renderForm(req, res)
      }
    })
  })

  router.use((err, req, res, next) => {
    if(err.code === 'EBADCSRFTOKEN'){
      if(req.user){
        renderForm(req, res, {
          errors : [{error : 'form expired. please try again.'}]
        })
      } else {
        res.redirect('/')
      }
    } else {
      return next(err)
    }
  })
  return router
}
