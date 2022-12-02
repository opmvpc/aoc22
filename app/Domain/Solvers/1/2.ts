import Solver from "../Solver";
import parser from "./parser";

class S implements Solver {
  public expectedResult: number[] = [45000, 199357];
  public day: number = 1;
  public part: number = 2;
  public inputs: any[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    const input = await this.inputs[number - 1];

    return input
      .map((x: number[]) => x.reduce((acc: number, current: number) => acc + current))
      .sort((a: number, b: number) => a - b)
      .reverse()
      .slice(0, 3)
      .reduce((acc: number, current: number) => acc + current);
  }
}

export default new S();
