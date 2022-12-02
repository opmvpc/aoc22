import Result from "./Result";

export default class Bench {
  public async results(
    day: number,
    part: number,
    fileNumber: number,
    times: number
  ): Promise<Result> {
    const results: Result[] = [];
    for (let i = 0; i < times; i++) {
      results.push(await this.run(day, part, fileNumber));
    }
    const average = results.reduce((acc, current) => acc + current.time, 0) / times;

    return new Result(day, part, fileNumber, results[0].result, results[0].expectedResult, average);
  }

  public async run(day: number, part: number, fileNumber: number): Promise<Result> {
    const solver = await import(`./${day}/${part}`);

    const start = performance.now();
    const result = await solver.default.solve(fileNumber);
    const end = performance.now();

    return new Result(
      day,
      part,
      fileNumber,
      result,
      solver.default.expectedResult[fileNumber - 1],
      end - start
    );
  }
}
