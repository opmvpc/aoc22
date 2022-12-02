export default interface Solver {
  expectedResult: number[];
  day: number;
  part: number;
  inputs: any[];
  solve(number: number): Promise<any>;
}
