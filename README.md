# 🚀 fastest-expressjs-validator

Effortless Request Validation for Express.js

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

You can install `fastest-expressjs-validator` using npm or yarn:

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
  - `requestType: ValidateReqType = "body"`: The type of request ("body", "params", "query") to validate (default is "body").
  - `validatorOptions: ValidatorOptions = { haltOnFirstError: true }`: Custom validation options (default options include halting on the first error).

### `validateMultiRequest`

A utility function for validating multiple request types.

- **Arguments:**
  - `schema: SchemaType`: The validation schema for the request.
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
} = require("fastest-expressjs-validator");
// or
import {
  validateRequest,
  validateMultiRequest,
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

const validateQuery = validateRequest(qSchema, "query");

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

## See More About Schemas all All Details

For more details on [Documentation](https://github.com/icebob/fastest-validator/blob/master/README.md).

## License

This package is open-source and available under the [MIT License](https://github.com/nextyfine-dev/fastest-express-validator/blob/main/LICENSE).
