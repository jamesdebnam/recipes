import express, { NextFunction, Request, Response } from "express";
import logger from "loglevel";
import "express-async-errors";

import cors from "cors";
import session from "express-session";
import pgSession from "connect-pg-simple";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { getRoutes } from "./routes";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../db";
import bcrypt from "bcryptjs";
import { User } from "../db/types";
import { errorMiddleware } from "./middlewares/error";

function startServer({ port = process.env.PORT } = {}) {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new (pgSession(session))({}),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    })
  );
  passport.use(
    new LocalStrategy(async (email, password, cb) => {
      try {
        const users = await db<User>("users").where({ email });
        if (users.length === 0) {
          return cb(null, false);
        }
        const [user] = users;
        if (bcrypt.compareSync(password, user.hash)) {
          return cb(null, { ...user, hash: undefined, salt: undefined });
        } else {
          return cb(null, false);
        }
      } catch (e) {
        logger.error("Passport local strategy err:", e);
        return cb("Couldn't log in due to internal server error");
      }
    })
  );

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, cb) => {
    try {
      const users = await db<User>("users").where({ id });
      cb(null, users[0]);
    } catch (e) {
      logger.error("Deserialize user err: ", e);
      return cb(e);
    }
  });

  app.use(errorMiddleware);
  app.use("/api", getRoutes());
}

export { startServer };
