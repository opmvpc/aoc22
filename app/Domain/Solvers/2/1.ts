import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [0, 0];
  public day: number = 2;
  public part: number = 1;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    return Math.max(
      ...((
        (((await this.inputs[number - 1]) as string).split("\n\n") as string[]).map(
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

export default new S();
