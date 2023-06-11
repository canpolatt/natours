const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* 
express.json() is middleware. Middleware is basically a function that can modify the incoming request data. It stands between
so in the middle of the request and the response. It's just a step that the request goes through while it's being processed.

express.json() basically retuns a function, and so that function is then added to the middleware stack. It can parse the data 
from the body.
 */
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  // If we don't call next function req-res cycle will be stuck in there
  // This middleware function going to apply to every single request
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
/* 
Mounting the router, mounting a new router on a route
tourRouter/userRouter is a middleware. It's kinda sub-application that we created. It has own routes.
That we created these different routers for each of the resources to have a nice separation of concern between
these resources. So basically creating one small application for each of them and then putting everything together in
one main app file.
 */
app.use('/api/v1/tours', tourRouter); // For '/api/v1/tours' route, we want to apply the tourRouter middleware
app.use('/api/v1/users', userRouter);

module.exports = app;
