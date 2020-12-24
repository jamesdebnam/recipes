import logger from 'loglevel';
import {connectMongo, startServer} from './start';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config()
logger.setLevel('info');

const db = mongoose.connection;
db.on('error', logger.error.bind(console, 'MongoDB connection error:'))
connectMongo();
startServer();
