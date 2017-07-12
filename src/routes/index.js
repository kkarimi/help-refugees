const express = require('express')
const passport = require('passport')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENTID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: 'code',
    scope: 'openid profile'
  }),
  function (req, res) {
    res.redirect('/')
  }
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/user')
  }
)

module.exports = router
