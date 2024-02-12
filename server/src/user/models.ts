import Joi from "joi";

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("admin", "user").required(),
});

export const UserIdSchema = Joi.object({
  id: Joi.number().required(),
});
