import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: string[] = ["CMZ", "???"];
  public day: number = 5;
  public part: number = 2;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<string> {
    const lines = (await this.inputs[number - 1]).split("\n");

    return "";
  }
}

export default new S();
