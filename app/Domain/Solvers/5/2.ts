import { AbstractSolver } from "../Contracts/AbstractSolver";

export default class S extends AbstractSolver {
  public expectedResult: string[] = ["MCD", "RNLFDJMCT"];
  public day: number = 5;
  public part: number = 2;

  public async solve(number: number): Promise<string> {
    const lines = this.inputs[number - 1].split("\n\n");
    const stacks: string[][] = [];

    const config = lines[0].split("\n");
    for (let index = config.length - 2; index >= 0; index--) {
      const line = config[index]
        .replace(/    /g, " ")
        .split(" ")
        .map((x) => {
          return x.charAt(1);
        });

      for (let index = 0; index < line.length; index++) {
        const char = line[index];
        if (stacks[index] === undefined) {
          stacks[index] = [];
        }
        if (char !== "") {
          stacks[index].push(char);
        }
      }
    }

    const instructions = lines[1].split("\n");
    const regex = /move (\d+) from (\d+) to (\d+)/;
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      const matches = regex.exec(instruction);
      if (matches === null) {
        continue;
      }

      const [_, number, from, to] = matches;
      const fromStack = stacks[parseInt(from) - 1];
      const toStack = stacks[parseInt(to) - 1];
      const temp = fromStack.splice(fromStack.length - parseInt(number));

      toStack.push(...temp);
    }

    let result = "";
    for (let index = 0; index < stacks.length; index++) {
      const stack = stacks[index];
      if (stack.length === 0) {
        continue;
      }
      result += stack.pop() ?? "";
    }

    return result;
  }
}
