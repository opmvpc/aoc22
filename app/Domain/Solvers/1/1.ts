import Solver from "../Solver";
import parser from "./parser";

class S implements Solver {
  public expectedResult: number[] = [24000, 67450];
  public day: number = 1;
  public part: number = 1;
  public inputs: any[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    const input = await this.inputs[number - 1];

    return Math.max(
      ...input.map((x: number[]) => x.reduce((acc: number, current: number) => acc + current))
    );
  }
}

export default new S();
