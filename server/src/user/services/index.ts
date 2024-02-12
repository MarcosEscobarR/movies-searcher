import { Result } from "../../../libs/result";
import { UserModel } from "../models";

const users: UserModel[] = [
  {
    id: 1,
    name: "admin",
    email: "test@test.com",
    password: "test",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getAllUsers = (): Result => Result.ok(users);

export const getUserById = (id: number): Result =>
  Result.ok(users.find((user) => user.id === id));

export const createUser = (user: UserModel): Result => {
  const newUser = {
    ...user,
    id: users.length + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
  return Result.created();
};

export const updateUser = (id: number, user: UserModel): Result => {
  const index = users.findIndex((user) => user.id === id);
  users[index] = {
    ...user,
    id: users[index].id,
    createdAt: users[index].createdAt,
    updatedAt: new Date(),
  };

  return Result.ok(users[index]);
};

export const deleteUser = (id: number): Result => {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return Result.ok();
};
