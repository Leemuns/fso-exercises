import { parseArguments } from "./utils/parseArguments.ts";

export function calculateBmi(height: number, mass: number): string {
  // height in cm, mass in kg
  const bmi: number = mass / (height / 100) ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  }
  return "Obese (Class III)";
}

if (process.argv[1] === import.meta.filename) {
  const args: number[] = parseArguments(process.argv);
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");
  if (args.some((a) => isNaN(a)))
    throw new Error("Provided values were not numbers!");
  const [height, weight]: number[] = args;

  console.log(calculateBmi(height, weight));
}
