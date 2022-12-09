import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [7, 1175];
  public day: number = 6;
  public part: number = 1;

  public async solve(number: number): Promise<number> {
    const line = this.inputs[number - 1].split("").map((x) => x.charCodeAt(0));
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
