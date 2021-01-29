// a basically complete-ish passport-local setup
// this is actually kind of a mixed bunch of es5 and es6
// sorry about that


/*
 * index.js
 */

// dependencies
import express    from 'express'
import bodyParser from 'body-parser'
import mongoose   from 'mongoose'
import cors       from 'cors'
import session    from 'express-session'

// our files
import passport from './passport'
import userCtrl from './userCtrl'

// starting express
// setting port equal to either the environment variable set,
// or 3000 if none
const
  app  = express()
, port = process.env.PORT || 3000

// setting up express's middleware
app
.use(bodyParser.json())
.use(express.static(__dirname + '/../public'))
.use(session({
  secret : 'foo'
, resave : true
, saveUninitialized : true
}))

.use(passport.initialize()) // must come before .session()
.use(passport.session())


// endpoints
.post('/api/user', userCtrl.addUser)
.get('/api/user', userCtrl.getUser)
.get('/api/getCurrentUser', userCtrl.getCurrentUser)

.post('/api/login', passport.authenticate('local-auth', {
  successRedirect : '/api/getCurrentUser'
}))

.get('/api/logout', (req, res, next) => {
  req.logout()
  return res.status(200).send('logged out')
})


/*
 * passport.js
 */

const
  passport      = require('passport')
, LocalStrategy = require('passport-local').Strategy
, User          = require('./user')

passport.use('local-auth', new LocalStrategy((username, password, done) => {

  User.findOne({username : username})
  .exec((err, user) => {
    if (err) {
      console.trace(err)
      done(err)
    }
    if (user) {
      if (user.validatePassword(password)) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }
    return done(null, false)
  })
}))

// saves session
passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  User.findById(_id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport


/*
 * userCtrl.js
 */

const User = require('./user')

module.exports = {
  addUser (req, res) {
    new User(req.body).save((err, user) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(user)
      }
    })
  }

, getCurrentUser (req, res) {
    if (req.user) {
      res.status(200).send(req.user)
    } else {
      res.status(403).send('forbidden')
    }
  }


, getUser (req, res) {
    User.findById(req.query.id, (err, user) => {
      if (err) {
        return console.error(err)
      } else {
        res.send(user)
      }
    })
  }

, logout (req, res) {
    req.logout()
    res.redirect('/')
  }

, isAuth (req, res, next) {
    if (req.user) {
      next()
    } else {
      res.status(403).send('Not Permitted')
    }
  }

}


/*
 * user.js
 */

import mongoose from 'mongoose'
import bcrypt   from 'bcryptjs' // any other bcrypt implementation would also do, here.

const User = new mongoose.Schema({
  username : {type : String, required : true}
, password : {type : String, required : true}
})

// hashing the password
User.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

// validation
User.methods.validatePassword = password => bcrypt.compareSync(password, this.password)

// saving (hashed) password
User.pre('save', function(next){
 let user = this
 if (!user.isModified('password')) {
   return next()
 }
 user.password = User.methods.generateHash(user.password)
 next()
})

module.exports = mongoose.model('User', User)

