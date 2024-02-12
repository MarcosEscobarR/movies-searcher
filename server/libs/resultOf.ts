import { Request, RequestHandler, Response } from "express";
import { Result } from "./result";

export function resultOf(
  handler: (
    params: unknown,
    req: Request<any, any, any, any>,
    res: Response<any, any>
  ) => Result | Promise<Result>,
  method: string,
  route: string,
  propertyKey: string
): RequestHandler {
  return async (req, res) => {
    try {
      const handlerGrapper = f(handler, req, res, propertyKey);
      const { status, data } = await handlerGrapper(
        controllerParamsBinder(method, req, route),
        req,
        res
      );

      return res.status(status).send(data);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  };
}

function f(
  handler: (
    params: unknown,
    req: Request<any, any, any, any>,
    res: Response<any, any>
  ) => Result | Promise<Result>,
  req: Request,
  res: Response,
  propertyKey: string
) {
  const bodyHandler = Reflect.getMetadata(
    `body:${propertyKey}`,
    handler.constructor
  );

  const paramsHandler = Reflect.getMetadata(
    `params:${propertyKey}`,
    handler.constructor
  );

  const queryHandler = Reflect.getMetadata(
    `query:${propertyKey}`,
    handler.constructor
  );

  const headersHandler = Reflect.getMetadata(
    `headers:${propertyKey}`,
    handler.constructor
  );

  const requestHandler = Reflect.getMetadata(
    `request:${propertyKey}`,
    handler.constructor
  );

  const responseHandler = Reflect.getMetadata(
    `response:${propertyKey}`,
    handler.constructor
  );

  const userHandler = Reflect.getMetadata(
    `user:${propertyKey}`,
    handler.constructor
  );

  return function (...args: any[]) {
    if (bodyHandler) {
      const { methodName, paramIndex } = bodyHandler;
      args[paramIndex] = req.body;
    }

    if (paramsHandler) {
      const { methodName, paramIndex, parameter } = paramsHandler;
      args[paramIndex] = req.params[parameter];
    }

    if (queryHandler) {
      queryHandler.forEach((query) => {
        args[query.paramIndex] = req.query[query.parameter];
      });
    }

    if (headersHandler) {
      const { methodName, paramIndex, header } = headersHandler;

      args[paramIndex] = header ? req.headers[header] : req.headers;
    }

    if (requestHandler) {
      const { methodName, paramIndex } = requestHandler;
      args[paramIndex] = req;
    }

    if (responseHandler) {
      const { methodName, paramIndex } = responseHandler;
      args[paramIndex] = res;
    }

    return handler.apply(this, args);
  };
}

function controllerParamsBinder(method: string, req: Request, route: string) {
  if (!method) {
    return req;
  }
  if (method === "post") {
    return req.body;
  }

  if (method === "get") {
    if (route.includes("/:")) {
      const params = route.split("/:")[1];

      if (Number(req.params[params])) {
        return Number(req.params[params]);
      }

      return req.params[params];
    }
    return req.query;
  }

  if (method === "put") {
    if (route.includes("/:")) {
      const params = route.split("/:")[1];
      if (Number(req.params[params])) {
        return Number(req.params[params]);
      }
      return { params: req.params[params], body: req.body };
    }
    return req.body;
  }

  if (method === "delete") {
    if (route.includes("/:")) {
      const params = route.split("/:")[1];
      if (Number(req.params[params])) {
        return Number(req.params[params]);
      }
      return req.params[params];
    }
    return req.query;
  }
}
