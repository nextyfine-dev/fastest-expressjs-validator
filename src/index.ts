import { NextFunction, Request, Response } from "express";
import Validator, {
  ValidationSchema as FVSchema,
  ValidatorConstructorOptions,
} from "fastest-validator";

export type DefaultSchema = { [key: string]: string | object | [] };

export interface ValidatorOptions extends ValidatorConstructorOptions {}

export type ValidationSchema<T extends DefaultSchema = DefaultSchema> =
  FVSchema<T>;

export type MultiValidationSchema = {
  body?: ValidationSchema;
  params?: ValidationSchema;
  query?: ValidationSchema;
  headers?: ValidationSchema;
};

export type ValidateReqType = "body" | "params" | "query" | "headers";

export type ValidateOptions = {
  requestType?: ValidateReqType;
  multiRequest?: boolean;
};

export type SchemaType = ValidationSchema | MultiValidationSchema;

const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

const isMultiValidationSchema = (
  schema: SchemaType
): schema is MultiValidationSchema => {
  return (
    typeof schema === "object" &&
    ("body" in schema ||
      "params" in schema ||
      "query" in schema ||
      "headers" in schema)
  );
};

export const getValidator = (validatorOptions: ValidatorOptions = {}) =>
  new Validator({
    useNewCustomCheckerFunction: true,
    ...validatorOptions,
  });

export const validTypes: ValidateReqType[] = [
  "body",
  "params",
  "query",
  "headers",
];

export const query: ValidateOptions = {
  requestType: "query",
  multiRequest: false,
};

export const params: ValidateOptions = {
  requestType: "params",
  multiRequest: false,
};
export const body: ValidateOptions = {
  requestType: "body",
  multiRequest: false,
};
export const headers: ValidateOptions = {
  requestType: "headers",
  multiRequest: false,
};

export const validateRequest = (
  schema: SchemaType,
  validateOptions: ValidateOptions = body,
  validatorOptions: ValidatorOptions = {}
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { multiRequest = false, requestType = "body" } = validateOptions;
    const validator = getValidator(validatorOptions);

    const err = {
      type: "Validation Error!",
      status: "error",
      message: "Invalid request type!",
    };
    if (multiRequest && isMultiValidationSchema(schema)) {
      for (const key of Object.keys(schema) as ValidateReqType[]) {
        if (!validTypes.includes(key)) return res.status(422).json(err);
        const validate = await validator.validate(req[key], schema[key]!);
        if (validate !== true)
          return res.status(422).json({
            ...err,
            message: validate[0].message,
            details: validate,
          });
      }
    } else {
      if (!validTypes.includes(requestType)) return res.status(422).json(err);
      const validate = await validator.validate(req[requestType], schema);
      if (validate !== true)
        return res
          .status(422)
          .json({ ...err, message: validate[0].message, details: validate });
    }
    next();
  });
};

export const validateMultiRequest = (
  schema: SchemaType,
  validatorOptions: ValidatorOptions = {}
) => validateRequest(schema, { multiRequest: true }, validatorOptions);
