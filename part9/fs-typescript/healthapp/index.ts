import express from "express";

import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({
    height,
    weight,
    bmiCategory: calculateBmi(height, weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
