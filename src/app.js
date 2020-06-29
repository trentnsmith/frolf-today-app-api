require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const coursesRouter = require('./courses/courses-router');


const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

//use of middlewares  
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//use of router
app.use('/api/courses', coursesRouter);

app.get('/', (req, res) => {
    res.send('/api/ is working')
    return res.status(200).end();
});

//creating server errorHandler
app.use(function errorHandler(error, req, res, next) {
    let response
    console.error(error)

    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        response = { message: error.toString(), error }
    }
    res.status(500).json(response)
});

module.exports = app;
