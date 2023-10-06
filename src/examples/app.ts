import express from "express";
import { validateQ } from "./validationMiddleware";

const app = express();

app.get("/", validateQ, (req, res) => {
  const { name } = req.query;
  res.status(200).json({
    message: `Validation working! From ${name}`,
  });
});

app.get("/multi/:id", validateQ, (req, res) => {
  const { name } = req.query;
  const { id } = req.params;
  res.status(200).json({
    message: `Validation working! From ${name} : ${id}`,
  });
});

app.listen(3000, () => console.log("Listening on 3000"));
