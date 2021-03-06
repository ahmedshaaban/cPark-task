import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import jwt from 'jwt-express';

import reportsRouter from './routes/reports';
import authRouter from './routes/auth';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwt.init(process.env.SECRET, { cookies: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', authRouter);
app.use('/report', reportsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'JWTExpressError') {
    // user is unauthorized
    res.status(401).send({ error: 'Unauthenticated' });
    next();
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

export default app;
