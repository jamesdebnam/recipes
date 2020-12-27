import express from "express";
import User, { IUser } from "../models/user";
import logger from "loglevel";
import passport from "passport";
import { isLoggedIn } from "../util/schemaValidation";

const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      console.log("user", req.logout, req.session);
      if (!users) {
        return res
          .status(404)
          .send({ status: "error", message: "No users found" });
      }
      return res.status(200).send({ status: "ok", data: users });
    } catch ({ message }) {
      return res.status(500).send({ status: "error", message });
    }
  })
  .post(async (req, res) => {
    try {
      const newUser = new User(req.body);
      User.register(newUser, req.body.password, (err, user) => {
        if (err) {
          res.status(400).send({
            status: "error",
            message: err.message ? err.message : "Could not register user",
          });
        } else {
          res.status(200).send({ status: "ok", data: newUser.getUserObj() });
        }
      });
    } catch ({ message }) {
      return res.status(500).send({ status: "error", message });
    }
  });

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", message: "No user with that email found" });
    }
    passport.authenticate("local")(req, res, () => {
      res
        .status(200)
        .send({ status: "ok", data: (req.user as IUser).getUserObj() });
    });
  } catch ({ message }) {
    return res.status(400).send({ status: "error", message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    if (!isLoggedIn(req)) {
      return res
        .status(400)
        .send({ status: "error", message: "User is not logged in" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).send({ status: "error", message: err });
      } else {
        return res.status(200).send({ status: "ok" });
      }
    });
  } catch ({ message }) {
    return res.status(400).send({ status: "error", message });
  }
});

export default router;
