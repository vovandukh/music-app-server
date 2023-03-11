require('dotenv').config();
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const authRouter = require('./router/auth.router');
const userRouter = require('./router/user.router');


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/uploads-image', express.static('uploads-image'));


app.use('/api', authRouter);
app.use('/api', userRouter);



module.exports = app;