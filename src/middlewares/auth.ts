import { User } from "../../db/types";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

type UserRole = "user" | "admin";

/**
 * Wraps passport.authenticate, and allows you to provide whether
 * route requires admin permissions
 */
export function authenticate(role: UserRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, user: User) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next("User not found");
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const isRoleAuthenticated = role === "admin" ? user.isAdmin : true;
        return isRoleAuthenticated
          ? next()
          : next("User does not have required permissions");
      });
    });
  };
}
