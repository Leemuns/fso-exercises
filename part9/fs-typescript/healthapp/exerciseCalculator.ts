import { parseArguments } from "./utils/parseArguments.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(hours: number[], target: number): Result {
  const targetTotal: number = target * hours.length;
  const hoursTotal: number = hours.reduce((a, h) => a + h);
  const isTargetHit: boolean = hoursTotal >= targetTotal;
  const rating: number = isTargetHit // star rating of 1-5 stars
    ? 5
    : Math.floor((hoursTotal / targetTotal) * 4);
  const ratingDesc: string[] = [
    "1/5 stars - absolute failure",
    "2/5 stars - slacking too much",
    "3/5 stars - mid",
    "4/5 stars - almost there",
    "5/5 stars - target hit",
  ];

  return {
    periodLength: hours.length,
    trainingDays: hours.reduce((a, h) => a + (h === 0 ? 0 : 1)),
    success: isTargetHit,
    rating: rating + 1,
    ratingDescription: ratingDesc[rating],
    target: target,
    average: hoursTotal / hours.length,
  };
}

if (process.argv[1] === import.meta.filename) {
  const args: number[] = parseArguments(process.argv);
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.some((a) => isNaN(a)))
    throw new Error("Provided values were not numbers!");
  const [target, ...hours] = args;

  console.log(calculateExercises(hours, target));
}
