import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [2, 573];
  public day: number = 4;
  public part: number = 1;

  public solve(number: number): any {
    const lines = this.inputs[number - 1].split("\n");
    let count: number = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === "") {
        break;
      }
      const [elve1, elve2] = lines[i].split(",");
      let [min1, max1] = elve1.split("-");
      let [min2, max2] = elve2.split("-");
      let binElve1 =
        ~(~BigInt(0) << BigInt(parseInt(max1) - parseInt(min1) + 1)) << BigInt(99 - parseInt(max1));
      let binElve2 =
        ~(~BigInt(0) << BigInt(parseInt(max2) - parseInt(min2) + 1)) << BigInt(99 - parseInt(max2));
      const overlap = binElve1 & binElve2;
      count += overlap === binElve1 || overlap === binElve2 ? 1 : 0;
    }
    return count;
  }
}
