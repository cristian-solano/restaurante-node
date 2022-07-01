//!Auth
//todo
//? /auth/login
// ? auth/signin
// ? /auth/reset-password
// ? /auth/verify-account
// ? /auth/deactived-account

const router = require('express').Router();
const authHttpHandler = require('../auth/auth.http');
const passport = require('passport')



router.route('/login')
    .post(authHttpHandler.loginUser)


    
router.route('/me/verify-token?')
    .get(passport.authenticate('jwt', {session: false}, authHttpHandler.verifyAccount))
    


module.exports = {
    router
}