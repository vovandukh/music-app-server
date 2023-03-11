const { Router } = require('express');
const authController = require('../controller/auth.controller');
const upload_avatar = require('../middleware/upload.avatars');
const { body } = require('express-validator');

const router = Router();


router.post('/auth/login', body('email').isEmail(), body('password').isLength({ min: 6 }), authController.login);
router.post('/auth/register', upload_avatar.single('avatar'), body('email').isEmail(), body('password').isLength({ min: 6 }), authController.register);


module.exports = router;