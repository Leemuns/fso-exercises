import express from "express";

import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  return res.send({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(Number(target)) || daily_exercises.some((e) => isNaN(e))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  return res.status(200).send(calculateExercises(daily_exercises, target));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
