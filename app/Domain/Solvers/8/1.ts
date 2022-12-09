import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [21, 1698];
  public day: number = 8;
  public part: number = 1;

  public async solve(number: number): Promise<number> {
    const lines = this.inputs[number - 1]
      .split("\n")
      .filter((l) => l.length > 0)
      .map((l) => l.split("").map((c) => parseInt(c)));

    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];

        let isVisibleFromLeft = Math.max(...lines[i].slice(0, j)) < char;
        let isVisibleFromRight = Math.max(...lines[i].slice(j + 1)) < char;
        let isVisibleFromTop = Math.max(...lines.map((l) => l[j]).slice(0, i)) < char;
        let isVisibleFromBottom = Math.max(...lines.map((l) => l[j]).slice(i + 1)) < char;
        count =
          isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom
            ? count + 1
            : count;
      }
    }

    return count;
  }
}
