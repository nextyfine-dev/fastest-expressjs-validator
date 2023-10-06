import {
  MultiValidationSchema,
  ValidationSchema,
  validateMultiRequest,
  validateRequest,
} from "..";

const schema: ValidationSchema = {
  name: "string",
};

const mSchema: MultiValidationSchema = {
  query: {
    name: "string",
  },
  params: {
    id: "string",
  },
};

export const validateQ = validateRequest(schema, "query");
export const validateM = validateMultiRequest(mSchema);
