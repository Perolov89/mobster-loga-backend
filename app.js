const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mobsRouter = require('./routes/mobs'); // <-- added

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mobs', mobsRouter); // <-- added

const port = 4000
app.listen(port, () => console.log(`\nPORT 4000 ENGAGED!!!!!! *.*\nhttp://localhost:${port}`))

module.exports = app;
