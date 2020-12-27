import logger from "loglevel";
import { connectToMongo, startServer } from "./start";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
logger.setLevel("info");

connectToMongo();
startServer();
