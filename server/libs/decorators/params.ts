import { Request } from "express";
import { HttpHeaders } from "../types";

export function Body() {
  return function (target: any, methodName: string, paramIndex: number) {
    Reflect.defineMetadata(
      `body:${methodName}`,
      { methodName, paramIndex },
      target[methodName].constructor
    );
  };
}

export function Params(parameter: string) {
  return function (target: any, methodName: string, paramIndex: number) {
    Reflect.defineMetadata(
      `params:${methodName}`,
      { methodName, paramIndex, parameter },
      target[methodName].constructor
    );
  };
}

export function Query(parameter: string) {
  return function (target: any, methodName: string, paramIndex: number) {
    const queryData =
      Reflect.getMetadata(
        `query:${methodName}`,
        target[methodName].constructor
      ) ?? {};
    Reflect.defineMetadata(
      `query:${methodName}`,
      [...queryData, { methodName, paramIndex, parameter }],
      target[methodName].constructor
    );
  };
}

export function Headers(header?: HttpHeaders) {
  return function (target: any, methodName: string, paramIndex: number) {
    Reflect.defineMetadata(
      `headers:${methodName}`,
      { methodName, paramIndex, header },
      target[methodName].constructor
    );
  };
}

export function Request(target: any, methodName: string, paramIndex: number) {
  Reflect.defineMetadata(
    `request:${methodName}`,
    { methodName, paramIndex },
    target[methodName].constructor
  );
}

export function Response(target: any, methodName: string, paramIndex: number) {
  Reflect.defineMetadata(
    `response:${methodName}`,
    { methodName, paramIndex },
    target[methodName].constructor
  );
}

export function User() {
  return function (target: any, methodName: string, paramIndex: number) {
    Reflect.defineMetadata(
      `user:${methodName}`,
      { methodName, paramIndex },
      target[methodName].constructor
    );
  };
}
