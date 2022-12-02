import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [12, 14610];
  public day: number = 2;
  public part: number = 2;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    const input = await this.inputs[number - 1];
    const lines = input.split("\n");
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === "") {
        break;
      }
      const line = lines[i];
      const outcome = line.codePointAt(2)! - 88; // 88 is the code point of 'X'
      const opponent = line.codePointAt(0)! - 65; // 65 is the code point of 'A'
      const me = (3 + outcome + opponent - 1) % 3;
      sum += me + 1 + ((4 + me - opponent) % 3) * 3;
    }

    return sum;
  }
}

export default new S();
