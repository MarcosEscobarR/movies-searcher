import { number } from "joi";
import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Post,
  Put,
  Validate,
} from "../../libs/decorators";
import { UserIdSchema, UserModel, UserSchema } from "./models";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} from "./services";

@Controller("/api/user")
export class UserController {
  @Get("/")
  get() {
    return getAllUsers();
  }

  @Get("/:id")
  @Validate("params", UserIdSchema)
  getById(@Params("id") id: number) {
    return getUserById(id);
  }
  @Post("/")
  @Validate("body", UserSchema)
  create(@Body() body: UserModel) {
    return createUser(body);
  }

  @Put("/:id")
  @Validate("body", UserSchema)
  @Validate("params", UserIdSchema)
  update(@Params("id") id: number, @Body() body: UserModel) {
    return updateUser(Number(id), body);
  }

  @Delete("/:id")
  @Validate("params", UserIdSchema)
  delete(@Params("id") id: number) {
    return deleteUser(id);
  }
}
