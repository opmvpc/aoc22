import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [15, 9241];
  public day: number = 2;
  public part: number = 1;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<any> {
    return ((await this.inputs[number - 1]) as string)
      .split("\n")
      .filter((x) => x !== "")
      .map((x) => x.split(" "))
      .map((x) => {
        let outcome = 0;
        const x1 = x[0];
        const x2 = x[1];
        if (
          (x1 === "A" && x2 === "X") ||
          (x1 === "B" && x2 === "Y") ||
          (x1 === "C" && x2 === "Z")
        ) {
          //draw
          outcome = 3;
        } else if (
          (x1 === "A" && x2 === "Z") ||
          (x1 === "B" && x2 === "X") ||
          (x1 === "C" && x2 === "Y")
        ) {
          //lose
          outcome = 0;
        } else {
          //win
          outcome = 6;
        }

        if (x2 === "X") {
          return outcome + 1;
        } else if (x2 === "Y") {
          return outcome + 2;
        }
        return outcome + 3;
      })
      .reduce((acc, current) => acc + current);
  }
}

export default new S();
