export function parseArguments(args: string[]): number[] {
  return args.slice(2).map((a) => Number(a));
}
