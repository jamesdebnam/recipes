//@ts-ignore
import config from "../knexfile";
import knex from "knex";
const environment = process.env.NODE_ENV || "development";

export default knex(config[environment]);
