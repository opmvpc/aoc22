import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [2, 573];
  public day: number = 4;
  public part: number = 1;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    const input = await this.inputs[number - 1];
    const lines = input.split("\n").filter((x) => x !== "");
    let count: number = 0;

    const toBinaryStringRepresentation = (elve: string): bigint => {
      const [min, max] = elve.split("-").map((x) => Number(x));
      let binaryStringRepresentation = "0b";
      for (let i = 1; i <= 99; i++) {
        binaryStringRepresentation += i >= min && i <= max ? "1" : "0";
      }
      return BigInt(binaryStringRepresentation);
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const [elve1, elve2] = line.split(",");
      const binElve1 = toBinaryStringRepresentation(elve1);
      const binElve2 = toBinaryStringRepresentation(elve2);
      const overlap = binElve1 & binElve2;

      if (overlap === binElve1 || overlap === binElve2) {
        count++;
      }
    }
    return count;
  }
}

export default new S();
