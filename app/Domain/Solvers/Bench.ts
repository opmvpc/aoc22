import Result from "./Contracts/Result";

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
    const { default: TSolver } = await import(`App/Domain/Solvers/${day}/${part}.ts`);
    const solver = new TSolver();
    await solver.parse();

    const start = performance.now();
    const result = solver.solve(fileNumber);
    // console.log(day, part, fileNumber,result);

    const end = performance.now();

    return new Result(
      day,
      part,
      fileNumber,
      result,
      solver.expectedResult[fileNumber - 1],
      end - start
    );
  }
}
