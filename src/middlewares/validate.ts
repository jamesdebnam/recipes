import Joi from "joi";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import pickKeys from "../util/pickKeys";
import { ApiError } from "./error";

type Schema = {
  params: {
    [key: string]: string;
  };
  query: {
    [key: string]: string;
  };
  body: {
    [key: string]: any;
  };
};

export default (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pickKeys(schema, ["params", "query", "body"]);
    const object = pickKeys(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };
