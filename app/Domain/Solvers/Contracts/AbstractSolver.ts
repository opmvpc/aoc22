import SolverContract from "./SolverContract";
import parser from "../Parser";

export abstract class AbstractSolver implements SolverContract {
  public expectedResult: any[];
  public day: number;
  public part: number;
  public inputs: string[] = [];

  public async parse(): Promise<void> {
    this.inputs.push(await parser.parse(this.day, 1));
    this.inputs.push(await parser.parse(this.day, 2));
  }

  public abstract solve(number: number): Promise<any>;
}
