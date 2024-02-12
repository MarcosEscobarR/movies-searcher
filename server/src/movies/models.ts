import Joi from "joi";

export const moviesQuerySchema = Joi.object({
  pageIndex: Joi.number().default(1),
  pageSize: Joi.number().default(10),
});

export const searchMoviesSchema = Joi.object({
  q: Joi.string().required(),
  pageIndex: Joi.number().default(1),
  pageSize: Joi.number().default(10),
});

export interface Movie {
  title: string;
  image: string;
  score: number;
  year: number;
  rating: number;
  color: string;
}
