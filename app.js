const sanitize = require('express-mongo-sanitize')
const applimit = require('express-rate-limit');
const cookieparser = require('cookie-parser');
const express = require('express');
const helmets = require('helmet');
const xss = require('xss-clean');
const path = require('path');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const globleErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
dotenv.config({path:'./config.env'})
let allowOrigin =JSON.parse(process.env[`ALLOWORIGIN_${process.env.NODE_ENV}`])
app.use(cors({
    origin: function(origin,callback){
        if(allowOrigin.includes(origin) || !origin){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(helmets())
const limiter = applimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'to many Api Request!! Please Login again'
})
app.use('/api2', limiter);
app.use(express.json({ limit: '14kb' }));
app.use(bodyParser())
app.use(express.urlencoded({ extended: true, limit: '14kb' }));
app.use(cookieparser());
app.use(sanitize());
app.use(xss());
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
)

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');
const bookingRouter = require('./routes/bookingRouter');
const { log } = require('console');

app.use('/', viewRouter);
app.use('/api2/v1/tours', tourRouter);
app.use('/api2/v1/users', userRouter);
app.use('/api2/v1/reviews', reviewRouter);
app.use('/api2/v1/bookings', bookingRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't found ${req.originalUrl} on this server`, 404));
})

app.use(globleErrorHandler)


module.exports = app