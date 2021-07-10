import express from "express";
import logger from "loglevel";
import passport from "passport";
import { isLoggedIn } from "../util/schemaValidation";

const router = express.Router();

router.route("/").post();

export default router;
