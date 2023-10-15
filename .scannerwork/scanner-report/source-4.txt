import {
  MultiValidationSchema,
  ValidationSchema,
  validateMultiRequest,
  validateRequest,
} from "..";

const querySchema: ValidationSchema = {
  name: "string",
  $$strict: true,
};

const bodySchema: ValidationSchema = {
  userName: "string",
  password: "string", // NOSONAR
  email: "email",
  $$strict: true,
};

const paramsSchema: ValidationSchema = {
  id: "string",
  $$strict: true,
};

const multiSchema: MultiValidationSchema = {
  body: {
    userName: "string",
    password: "string", // NOSONAR
    email: "email",
    $$strict: true,
  },
  query: {
    randomStr: "string",
    $$strict: true,
  },
};

const headerParamSchema: MultiValidationSchema = {
  headers: {
    hasauth: "string",
  },
  params: {
    id: "string",
  },
};

export const validateQuery = validateRequest(querySchema, {
  requestType: "query",
});

export const validateBody = validateRequest(bodySchema);
export const validateParams = validateRequest(paramsSchema, {
  requestType: "params",
});

export const validateMultiReq = validateMultiRequest(multiSchema);

export const validateHeaderParams = validateMultiRequest(headerParamSchema);
