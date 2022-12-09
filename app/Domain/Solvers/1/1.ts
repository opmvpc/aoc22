import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [24000, 67450];
  public day: number = 1;
  public part: number = 1;

  public async solve(number: number): Promise<any> {
    return Math.max(
      ...((
        ((this.inputs[number - 1] as string).split("\n\n") as string[]).map(
          (block: string): number[] =>
            (
              (block.split("\n") as string[]).filter(
                (number: string): boolean => number !== ""
              ) as string[]
            ).map((number: string): number => parseInt(number) as number) as number[]
        ) as number[][]
      ).map(
        (x: number[]): number => x.reduce((acc: number, current: number) => acc + current) as number
      ) as number[])
    ) as number;
  }
}
