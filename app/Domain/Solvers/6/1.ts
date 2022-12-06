import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [7, 1175];
  public day: number = 6;
  public part: number = 1;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<number> {
    const line = await (await this.inputs[number - 1]).split("").map((x) => x.charCodeAt(0));
    for (let index = 3; index < line.length; index++) {
      const sequence = line.slice(index - 3, index + 1);
      if (sequence.filter((x, i, a) => a.indexOf(x) !== i).length > 0) {
        continue;
      } else {
        return index + 1;
      }
    }

    return 0;
  }
}

export default new S();
