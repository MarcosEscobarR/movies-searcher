import { Router } from "express";
import { resultOf } from "./resultOf";
import { validate } from "./validate";
import * as routes from "../src/routes";

export function useControllers() {
  const controllers = Object.values(routes);
  const router = Router();

  controllers.forEach((controller: any) => {
    const instance = new controller();
    const prefix = Reflect.getMetadata("controllerRoute", controller);

    Object.getOwnPropertyNames(controller.prototype).forEach((propertyKey) => {
      // Extrae la propiedad y el schemma para poder validar atravez de joi
      const validateProperty = Reflect.getMetadata(
        "validationProperty",
        instance,
        propertyKey
      );

      const validateSchema = Reflect.getMetadata(
        "validationSchema",
        instance,
        propertyKey
      );

      const route = Reflect.getMetadata("route", instance, propertyKey);
      let httpMethod = Reflect.getMetadata("httpMethod", instance, propertyKey);

      const handler = instance[propertyKey];

      if (route !== undefined && httpMethod) {
        // @ts-ignore
        router[httpMethod](
          `${prefix}${route}`,
          validate(validateProperty, validateSchema),
          resultOf(handler, httpMethod, route, propertyKey)
        );
      }
    });
  });

  router.stack.forEach((route) => {
    if (route.route && route.route.path) {
      console.log(route.route.stack[0].method, route.route.path);
    }
  });
  return router;
}
