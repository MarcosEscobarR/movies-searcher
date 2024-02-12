import "reflect-metadata";
import { HttpOptions } from "../types";

/**
 * Construye el metodo GET del controlador.
 * @param route - Ruta del metodo.
 * @returns {Function}
 * @example @Get("login")
 */
export function Get(route: string = "", options?: HttpOptions): Function {
  route = validateMethodRoute(route);
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("httpMethod", "get", target, propertyKey);
    Reflect.defineMetadata("route", route, target, propertyKey);
  };
}

/**
 * Construye el metodo POST del controlador.
 * @param route - Ruta del metodo.
 * @returns {Function}
 * @example @Post("login")
 */
export function Post(route: string = "", options?: HttpOptions): Function {
  route = validateMethodRoute(route);

  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("httpMethod", "post", target, propertyKey);
    Reflect.defineMetadata("route", route, target, propertyKey);
  };
}

/**
 * Construye el metodo PUT del controlador.
 * @param route - Ruta del metodo.
 * @returns {Function}
 * @example @Put("login")
 */
export function Put(route: string = ""): Function {
  route = validateMethodRoute(route);

  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("httpMethod", "put", target, propertyKey);
    Reflect.defineMetadata("route", route, target, propertyKey);
  };
}

/**
 * Construye el metodo DELETE del controlador.
 * @param route - Ruta del metodo.
 * @returns {Function}
 * @example @Delete("login")
 */
export function Delete(route: string = ""): Function {
  route = validateMethodRoute(route);

  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("httpMethod", "delete", target, propertyKey);
    Reflect.defineMetadata("route", route, target, propertyKey);
  };
}

/**
 * Construye la ruta principal del controlador
 * @param route - Ruta principal del controlador
 * @returns {Function}
 * @example @Route("/api/auth/")
 */
export function Controller(route: string): Function {
  route = validateControllerRoute(route);
  return function (target: Function) {
    Reflect.defineMetadata("controllerRoute", route, target);
  };
}

function validateMethodRoute(route: string) {
  if (route && !route.startsWith("/")) {
    route = "/" + route;
  }

  return route;
}

function validateControllerRoute(route: string) {
  if (route.endsWith("/")) {
    route = route.slice(0, -1);
  }

  return route;
}
