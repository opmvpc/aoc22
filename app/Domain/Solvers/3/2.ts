import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [70, 2758];
  public day: number = 3;
  public part: number = 2;

  public async solve(number: number): Promise<any> {
    const input = this.inputs[number - 1];
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
