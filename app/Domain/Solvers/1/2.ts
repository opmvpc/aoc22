import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [45000, 199357];
  public day: number = 1;
  public part: number = 2;

  public solve(number: number): any {
    return this.inputs[number - 1]
      .split("\n\n")
      .map((block) =>
        block
          .split("\n")
          .filter((number) => number !== "")
          .map((number) => parseInt(number))
      )
      .map((x: number[]) => x.reduce((acc: number, current: number) => acc + current))
      .sort((a: number, b: number) => b - a)
      .slice(0, 3)
      .reduce((acc: number, current: number) => acc + current);
  }
}
