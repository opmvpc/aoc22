import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: number[] = [8, 672280];
  public day: number = 8;
  public part: number = 2;

  public async solve(number: number): Promise<number> {
    const lines = this.inputs[number - 1]
      .split("\n")
      .filter((l) => l.length > 0)
      .map((l) => l.split("").map((c) => parseInt(c)));

    let counts: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];

        let treesVisibleFromLeft = this.countVisibleTrees(lines[i].slice(0, j).reverse(), char);
        let treesVisibleFromRight = this.countVisibleTrees(lines[i].slice(j + 1), char);
        let treesVisibleFromTop = this.countVisibleTrees(
          lines
            .slice(0, i)
            .map((l) => l[j])
            .reverse(),
          char
        );
        let treesVisibleFromBottom = this.countVisibleTrees(
          lines.slice(i + 1).map((l) => l[j]),
          char
        );

        counts.push(
          treesVisibleFromLeft *
            treesVisibleFromRight *
            treesVisibleFromTop *
            treesVisibleFromBottom
        );
      }
    }

    return Math.max(...counts);
  }

  private countVisibleTrees(trees: number[], char: number): number {
    let count = 0;
    for (let i = 0; i < trees.length; i++) {
      count++;
      if (trees[i] >= char) {
        break;
      }
    }
    return count;
  }
}
