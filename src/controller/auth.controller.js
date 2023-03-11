const userSchema = require('../schema/user.schema');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDTO = require('../dtos/user.dtos');
const { validationResult } = require('express-validator')


class AuthController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({ message: 'Invalid email or password' })
            }
            const newUser = req.body;
            const { email, password } = newUser;
            if (!!await userSchema.findOne({ email })) {
                return res.status(200).json({ message: 'User with this email exists' })
            }
            const hashPassword = await bcript.hash(password, 7);
            const file = req.file
            const createdUser = await userSchema.create(
                {
                    ...newUser,
                    password: hashPassword,
                    avatarURL: file ? `${file.destination}/${file.filename}` :
                        'uploads-image/avatars/default-avatar.jpg'
                }
            )
            const DTO = await new userDTO(createdUser);
            const token = await jwt.sign({ ...DTO }, process.env.SECRET_KEY, { expiresIn: '24h' })
            return res.status(201).json({ user: { ...DTO }, token: `Bearer ${token}` })
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({ message: 'Invalid email or password' })
            }
            const { email, password } = req.body;
            const candidate = await userSchema.findOne({ email });
            if (!candidate || !bcript.compareSync(password, candidate.password)) {
                return res.status(200).json({ message: 'Wrong email or password' });
            }
            const DTO = await new userDTO(candidate);
            const token = jwt.sign({ ...DTO }, process.env.SECRET_KEY, { expiresIn: '24h' })
            return res.status(201).json({ user: { ...DTO }, token: `Bearer ${token}` }
            )

        } catch (e) {
            next(e);
        }
    }
}


module.exports = new AuthController;