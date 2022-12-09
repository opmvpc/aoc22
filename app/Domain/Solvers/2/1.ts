import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [15, 9241];
  public day: number = 2;
  public part: number = 1;

  public async solve(number: number): Promise<any> {
    const input = this.inputs[number - 1];
    const lines = input.split("\n");
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === "") {
        break;
      }
      const line = lines[i];
      const me = line.codePointAt(2)! - 88; // 88 is the code point of 'X'
      const opponent = line.codePointAt(0)! - 65; // 65 is the code point of 'A'
      sum += me + 1 + ((4 + me - opponent) % 3) * 3;
    }

    return sum;
  }
}
