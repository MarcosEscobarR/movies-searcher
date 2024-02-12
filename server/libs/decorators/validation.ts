import Joi from "joi";

/**
 * Valida los datos de entrada de una petición.
 * @param property - Propiedad a validar.
 * @param schema - Esquema de validación.
 * @returns {Function}
 * @example @Validate("body", registerSchema)
 */
export function Validate(
  property: "body" | "params" | "query",
  schema: Joi.Schema
): Function {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("validationProperty", property, target, propertyKey);
    Reflect.defineMetadata("validationSchema", schema, target, propertyKey);
  };
}
