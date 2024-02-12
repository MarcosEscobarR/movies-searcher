import { RequestHandler } from "express";
import Joi from "joi";

export function validate(
  property: "body" | "params" | "query",
  schema: Joi.Schema
): RequestHandler {
  return (req, res, next) => {
    if (!property || !schema) return next();

    const { error, value } = schema.validate(req[property], {
      stripUnknown: true,
      abortEarly: false,
    });

    if (error) {
      return res.status(422).send({
        message: "There were validation errors",
        errors: error.details.map((e: { message: string }) => e.message),
      });
    }

    req[property] = value;
    return next();
  };
}
