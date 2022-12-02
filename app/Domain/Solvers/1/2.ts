import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [45000, 199357];
  public day: number = 1;
  public part: number = 2;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    return (await this.inputs[number - 1])
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

export default new S();
