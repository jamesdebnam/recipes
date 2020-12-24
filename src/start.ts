import express, {NextFunction, Request, Response} from 'express'
import logger from 'loglevel'
import 'express-async-errors'

import bodyParser from 'body-parser'
import {getRoutes} from './routes'
import mongoose from "mongoose";
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from "./models/user";

function startServer({port = process.env.PORT} = {}) {
  const app = express()
  app.use(errorMiddleware)
  app.use(bodyParser.json())
  app.listen(port, () => {
    logger.info(`Listening on port ${port}`)
  })
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use('/api', getRoutes())
}

async function connectMongo() {
  try {
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    logger.info('Connection to mongoDB successful')
  } catch (e) {
    logger.error(`Couldn't connect to mongoDB: ${e}`)
  }
}

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
}

export {startServer, connectMongo}
