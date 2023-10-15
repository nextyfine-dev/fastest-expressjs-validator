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

export default app;
