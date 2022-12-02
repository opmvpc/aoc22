import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [12, 14610];
  public day: number = 2;
  public part: number = 2;
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
        if (x2 === "Y") {
          //draw
          outcome = 3;
        } else if (x2 === "X") {
          //lose
          outcome = 0;
        } else {
          //win
          outcome = 6;
        }

        let choice = "";
        if (x1 === "A") {
          if (outcome === 0) {
            choice = "C";
          } else if (outcome === 3) {
            choice = "A";
          } else {
            choice = "B";
          }
        } else if (x1 === "B") {
          if (outcome === 0) {
            choice = "A";
          } else if (outcome === 3) {
            choice = "B";
          } else {
            choice = "C";
          }
        } else {
          if (outcome === 0) {
            choice = "B";
          } else if (outcome === 3) {
            choice = "C";
          } else {
            choice = "A";
          }
        }

        if (choice === "A") {
          return outcome + 1;
        } else if (choice === "B") {
          return outcome + 2;
        }
        return outcome + 3;
      })
      .reduce((acc, current) => acc + current);
  }
}

export default new S();
