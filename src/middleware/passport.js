const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const users = mongoose.model('users');



const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

module.exports = passport => {
    passport.use
        (
            new jwtStrategy(options, async (payload, done) => {
                try {
                    const user = await users.findById(payload._id).select('email _id');
                    if (user) {
                        done(null, user)
                    } else {
                        done(null, false)
                    }
                } catch (e) {
                    console.log(e);
                }
            })
        )
}