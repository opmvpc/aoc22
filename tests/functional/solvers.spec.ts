import { test } from "@japa/runner";
import Drive from "@ioc:Adonis/Core/Drive";
import Solver from "App/Domain/Solvers/Contracts/Solver";

interface TestCase {
  solver: Solver;
  day: number;
  part: 1 | 2;
  file: 1 | 2;
}

const getSolvers = async () => {
  const solvers: TestCase[] = [];
  const days = await Drive.use("localInputFiles")
    .list("/")
    .filter((x) => /(1[0-9]|2[0-5]|[1-9])/.test(x.location))
    .toArray();

  for (const day of days) {
    for (let part = 1; part <= 2; part++) {
      try {
        const { default: solver } = await import(`App/Domain/Solvers/${day.location}/${part}.ts`);
        solvers.push({ solver: solver as Solver, file: 1, day: solver.day, part: solver.part });
        solvers.push({ solver: solver as Solver, file: 2, day: solver.day, part: solver.part });
      } catch (error) {}
    }
  }
  return solvers;
};

test("solver - day {day} part {part} file {file}")
  .with(async () => await getSolvers())
  .run(async ({ assert }, testCase: TestCase) => {
    assert.equal(
      await testCase.solver.solve(testCase.file),
      testCase.solver.expectedResult[testCase.file - 1]
    );
  });
