const { Schema, model } = require('mongoose');


const UserSchema = new Schema
    ({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        displayName: { type: String, required: true },
        avatarURL: { type: String, default: '' },
        location: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'USER' },
    })

module.exports = model('users', UserSchema);


