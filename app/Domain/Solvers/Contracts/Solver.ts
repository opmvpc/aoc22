export default interface Solver {
  expectedResult: any[];
  day: number;
  part: number;
  inputs: any[];
  solve(number: number): Promise<any>;
}
