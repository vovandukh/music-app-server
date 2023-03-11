const { Router } = require('express');
const userController = require('../controller/user.controller');
const passport = require('passport');
const upload_avatar = require('../middleware/upload.avatars')


const router = Router();

router.get('/user', passport.authenticate('jwt', { session: false }), userController.getAllUsers);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), userController.getUser);
router.put('/user/:id', upload_avatar.single('avatar'), passport.authenticate('jwt', { session: false }), userController.updateUser);
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser);

module.exports = router;