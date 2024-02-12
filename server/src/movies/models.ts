import Joi from "joi";

export const moviesQuerySchema = Joi.object({
  pageIndex: Joi.number().default(1),
  pageSize: Joi.number().default(10),
});

export const searchMoviesSchema = Joi.object({
  q: Joi.string().required(),
});
