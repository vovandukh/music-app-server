const userSchema = require('../schema/user.schema');
const UserDTO = require('../dtos/user.dtos');
const jwt = require('jsonwebtoken');

class UserController {

    async getAllUsers(req, res, next) {
        try {
            const headersTOKEN = req.headers.authorization;
            const TOKEN = headersTOKEN.split(' ')[1];
            jwt.verify(TOKEN, process.env.SECRET_KEY, async (err, decoded) => {
                if (decoded.role === "ADMIN") {
                    const users = await userSchema.find();
                    const arrayUsers = [];
                    users.forEach(el => {
                        const DTO = new UserDTO(el);
                        arrayUsers.push(DTO);
                    })
                    res.status(200).json({ user: arrayUsers })
                } else {
                    res.status(200).json({
                        message: 'You do not have administrator rights'
                    })
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async getUser(req, res, next) {
        try {
            const userId = req.params.id;
            const headersTOKEN = req.headers.authorization;
            const TOKEN = headersTOKEN.split(' ')[1];
            jwt.verify(TOKEN, process.env.SECRET_KEY, async (err, decoded) => {
                if (decoded._id === userId) {
                    const candidate = await userSchema.findById(decoded._id)
                    if (!candidate) {
                        return res.status(404).json({ message: 'User not found' })
                    }
                    const DTO = await new UserDTO(candidate);
                    res.status(200).json({ user: { ...DTO } })
                } else {
                    res.status(200).json({
                        message: 'You have no rights'
                    })
                }
            })
        } catch (e) {
            next(e)
        }
    }
    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const headersTOKEN = req.headers.authorization;
            const TOKEN = headersTOKEN.split(' ')[1];
            jwt.verify(TOKEN, process.env.SECRET_KEY, async (err, decoded) => {
                if (decoded._id === userId) {
                    const candidate = await userSchema.findById(decoded._id)
                    if (!candidate) {
                        return res.status(404).json({ message: 'User not found' })
                    }
                    const file = req.file;
                    await candidate.updateOne({
                        ...req.body,
                        avatarURL: file ? `${file.destination}/${file.filename}` : candidate.avatarURL
                    })
                    const updatedUser = await userSchema.findById(userId);
                    const DTO = await new UserDTO(updatedUser);
                    res.status(200).json({ user: { ...DTO } })
                } else {
                    res.status(200).json({
                        message: 'You have no rights'
                    })
                }
            })
        } catch (e) {
            next(e)
        }
    }
    async deleteUser(req, res, next) {
        try {
            const headersTOKEN = req.headers.authorization;
            const TOKEN = headersTOKEN.split(' ')[1];
            jwt.verify(TOKEN, process.env.SECRET_KEY, async (err, decoded) => {
                if (decoded.role === 'ADMIN') {
                    const userID = req.params.id;
                    await userSchema.deleteOne({ _id: userID });
                    res.status(200).json({ message: 'Deleted' })
                } else {
                    res.status(200).json({
                        message: 'You do not have administrator rights'
                    })
                }
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController;