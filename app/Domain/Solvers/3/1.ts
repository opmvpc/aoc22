import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [157, 7553];
  public day: number = 3;
  public part: number = 1;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    const input = await this.inputs[number - 1];
    const lines = input.split("\n");
    const results: number[] = [];
    for (const line of lines) {
      if (line === "") {
        break;
      }

      let compartment1: number[] = [];
      let compartment2: number[] = [];
      let char = 0;
      for (let index = 0; index < line.length / 2; index++) {
        char = line.codePointAt(index) ?? 0;
        compartment1.push(char >= 97 ? char - 96 : char - 38);
      }
      for (let index = line.length / 2; index < line.length; index++) {
        char = line.codePointAt(index) ?? 0;
        compartment2.push(char >= 97 ? char - 96 : char - 38);
      }
      const intersection = new Set(compartment1.filter((x) => compartment2.includes(x))).values();

      results.push(intersection.next().value ?? 0);
    }

    return results.reduce((a, b) => a + b, 0);
  }
}

export default new S();
