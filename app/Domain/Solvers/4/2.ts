import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [0, 0];
  public day: number = 4;
  public part: number = 2;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    const input = await this.inputs[number - 1];
    const lines = input.split("\n").filter((x) => x !== "");
    const results: number[] = [];
    for (let groupIndex = 0; groupIndex < lines.length; groupIndex += 3) {
      const compartments: Set<number>[] = [];
      let char = 0;
      let line = "";
      let lineIndex = 0;
      for (let i = 0; i < 3; i++) {
        lineIndex = groupIndex + i;
        line = lines[lineIndex];
        for (let j = 0; j < line.length; j++) {
          char = line.codePointAt(j)!;
          if (compartments[i] === undefined) {
            compartments[i] = new Set();
          }
          compartments[i].add(char >= 97 ? char - 96 : char - 38);
        }
      }

      const setIntersection = (setA: Set<number>, setB: Set<number>): Set<number> => {
        let intersection = new Set<number>();

        for (const elem of setB) {
          if (setA.has(elem)) {
            intersection.add(elem);
          }
        }
        return intersection;
      };

      results.push(
        setIntersection(compartments[0], setIntersection(compartments[1], compartments[2]))
          .values()
          .next().value ?? 0
      );
    }

    return results.reduce((a, b) => a + b, 0);
  }
}

export default new S();
