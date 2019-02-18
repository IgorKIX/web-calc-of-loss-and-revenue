const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./api/controllers/index');
const adminsRoutes = require('./api/routes/admins');
const streetRoutes = require('./api/routes/streets');
const jobRoutes = require('./api/routes/jobs');

mongoose.connect('mongodb://localhost/sumwebdb', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

//set up template engine
app.set('views', './views');
app.set('view engine', 'ejs');
//static files
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handling CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access=Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//TODO:make this '/' properly
app.use('/', indexRouter);
app.use('/admins', adminsRoutes);
app.use('/streets', streetRoutes);
app.use('/jobs', jobRoutes);

//Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;