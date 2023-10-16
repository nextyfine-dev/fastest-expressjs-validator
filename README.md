# fastest-expressjs-validator 🚀

🚀 Effortless Request Validation for [Express.js](https://github.com/expressjs/express)

- [fastest-expressjs-validator 🚀](#fastest-expressjs-validator-)
  - [Description](#description)
  - [Features](#features)
  - [Installation](#installation)
    - [Using bun:](#using-bun)
    - [Using npm:](#using-npm)
    - [Using yarn:](#using-yarn)
  - [Functions and Arguments](#functions-and-arguments)
    - [`validateRequest`](#validaterequest)
  - [Request Validation Options](#request-validation-options)
    - [Query Validation](#query-validation)
    - [Params Validation](#params-validation)
    - [Body Validation](#body-validation)
    - [Headers Validation](#headers-validation)
    - [`validateMultiRequest`](#validatemultirequest)
  - [Usage](#usage)
    - [Importing the package](#importing-the-package)
    - [Middleware for Single Request Type](#middleware-for-single-request-type)
    - [Middleware for Multiple Request Types](#middleware-for-multiple-request-types)
  - [More code examples](#more-code-examples)
  - [See More About Schemas and All Details](#see-more-about-schemas-and-all-details)
  - [License](#license)

## Description

`fastest-expressjs-validator` simplifies request validation in Express.js applications. Define schemas for request bodies, URL parameters, and query parameters with ease. Improve the reliability and security of your Express API effortlessly. It leverages the power of the [`fastest-validator`](https://www.npmjs.com/package/fastest-validator) library to validate incoming requests efficiently.

## Features

✅ Define validation schemas for body, params, and queries.

✅ Enhanced security and reliability for your Express API.

✅ Customizable validation options.

✅ Support for asynchronous and synchronous validation.

✅ Detailed error messages and structured responses for validation errors.

✅ High performance with minimal code usage.

✅ Written in TypeScript for enhanced type safety and developer experience.

## Installation

You can install `fastest-expressjs-validator` using bun or npm or yarn:

### Using bun:

```bash
bun add fastest-expressjs-validator
```

### Using npm:

```bash
npm install fastest-expressjs-validator
```

### Using yarn:

```bash
yarn add fastest-expressjs-validator
```

## Functions and Arguments

### `validateRequest`

A middleware function for request validation in Express.js.

- **Arguments:**
  - `schema: SchemaType`: The validation schema for the request.
  - `validateOptions: ValidateOptions = body`
    The type of request ("body", "params", "query", "headers") to validate (default is "body").
  - `validatorOptions: ValidatorOptions = { haltOnFirstError: true }`: Custom validation options (default options include halting on the first error).

## Request Validation Options

When using this middleware, you have the flexibility to specify the type of request you want to validate (e.g., "body," "params," "query," or "headers"). Here are the objects for `validateOptions`:

### Query Validation

```javascript
const query = {
  requestType: "query",
  multiRequest: false,
};
```

### Params Validation

```javascript
const params = {
  requestType: "params",
  multiRequest: false,
};
```

### Body Validation

```javascript
const body = {
  requestType: "body",
  multiRequest: false,
};
```

### Headers Validation

```javascript
const headers = {
  requestType: "headers",
  multiRequest: false,
};
```

### `validateMultiRequest`

A utility function for validating multiple request types.

- **Arguments:**
  - `schema: SchemaType`: The validation schema for the request.
  - `validateOptions`: is not required! Automatically detects default options.
  - `validatorOptions: ValidatorOptions = {}`: Custom validation options.

```typescript
type SchemaType = ValidationSchema | MultiValidationSchema;
```

## Usage

### Importing the package

```typescript
const {
  validateRequest,
  validateMultiRequest,
  query,
} = require("fastest-expressjs-validator");
// or
import {
  validateRequest,
  validateMultiRequest,
  query,
} from "fastest-expressjs-validator";
```

### Middleware for Single Request Type

```typescript
// Define a validation schema
const schema = {
  username: "string",
  password: "string",
};

// Use the middleware in your Express route
app.post("/login", validateRequest(schema), (req, res) => {
  // Your route logic here
});

OR;

const qSchema = {
  q: "string",
};

const validateQuery = validateRequest(qSchema, query);

app.get("/", validateQuery, (req, res) => {
  // ... your code here
});
```

### Middleware for Multiple Request Types

```typescript
// Define a validation schema
const multiSchema = {
  body: {
    username: "string",
    password: "string",
  },
  params: {
    id: "number",
  },
};

// Use the middleware in your Express route
app.put("/user/:id", validateMultiRequest(multiSchema), (req, res) => {
  // Your route logic here
});
```

## More code examples

`validationMiddleware.ts`

```typescript
import {
  MultiValidationSchema,
  ValidationSchema,
  validateMultiRequest,
  validateRequest,
  query,
  params,
} from "fastest-expressjs-validator";

const querySchema: ValidationSchema = {
  name: "string",
  $$strict: true,
};

const bodySchema: ValidationSchema = {
  userName: "string",
  password: "string",
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
    password: "string",
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

export const validateQuery = validateRequest(querySchema, query);

export const validateBody = validateRequest(bodySchema);
export const validateParams = validateRequest(paramsSchema, params);

export const validateMultiReq = validateMultiRequest(multiSchema);

export const validateHeaderParams = validateMultiRequest(headerParamSchema);
```

`app.ts`

```typescript
import crypto from "node:crypto";
import express from "express";
import {
  validateBody,
  validateHeaderParams,
  validateMultiReq,
  validateParams,
  validateQuery,
} from "./validationMiddleware";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};

app.get("/", validateQuery, (req, res) => {
  const { name } = req.query;
  res.status(200).json({
    message: `Validation working! From ${name}`,
  });
});

app.post("/login", validateBody, (req, res) => {
  const { userName, password, email } = req.body;
  const hashedPassword = hashPassword(password);
  res.status(200).json({
    userName,
    email,
    password: hashedPassword,
  });
});

app.get("/getUser/:id", validateParams, (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `User found! : ${id}`,
  });
});

app.post("/signup", validateMultiReq, (req, res) => {
  const { userName, password, email } = req.body;
  const { randomStr } = req.query;
  const hashedPassword = hashPassword(password);

  res.status(201).json({
    userName,
    email,
    randomStr,
    password: hashedPassword,
  });
});

app.post("/headers/:id", validateHeaderParams, (req, res) => {
  const { hasauth } = req.headers;
  const { id } = req.params;
  res.status(200).json({ hasauth, id });
});

app.listen(3001, () =>
  console.log(`App is listening on http://localhost:3001`)
);
```

## See More About Schemas and All Details

For more details on [Documentation](https://github.com/icebob/fastest-validator/blob/master/README.md).

## License

This package is open-source and available under the [MIT License](https://github.com/nextyfine-dev/fastest-express-validator/blob/main/LICENSE).
