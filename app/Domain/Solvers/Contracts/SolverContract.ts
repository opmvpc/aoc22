export default interface SolverContract {
  expectedResult: any[];
  day: number;
  part: number;
  inputs: string[];
  solve(number: number): Promise<any>;
  parse(): Promise<void>;
}
