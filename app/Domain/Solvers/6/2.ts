import { AbstractSolver } from "../Contracts/AbstractSolver";
export default class S extends AbstractSolver {
  public expectedResult: number[] = [19, 3217];
  public day: number = 6;
  public part: number = 2;

  public solve(number: number): any {
    const line = this.inputs[number - 1].split("").map((x) => x.charCodeAt(0));
    for (let index = 13; index < line.length; index++) {
      const sequence = line.slice(index - 13, index + 1);
      if (sequence.filter((x, i, a) => a.indexOf(x) !== i).length > 0) {
        continue;
      } else {
        return index + 1;
      }
    }

    return 0;
  }
}
