import { Request } from "express";
import logger from "loglevel";

declare module "express-session" {
  interface Session {
    passport: { user: string };
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function isLoggedIn(req: Request): boolean {
  console.log(req.session);
  return !!req.session.passport?.user;
}
