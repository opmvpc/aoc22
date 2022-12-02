import { test } from "@japa/runner";
import Drive from "@ioc:Adonis/Core/Drive";
import Solver from "App/Domain/Solvers/Contracts/Solver";

const getSolvers = async () => {
  const solvers: Solver[] = [];
  const days = await Drive.use("localInputFiles")
    .list("/")
    .filter((x) => /(1[0-9]|2[0-5]|[1-9])/.test(x.location))
    .toArray();

  for (const day of days) {
    for (let part = 1; part <= 2; part++) {
      try {
        const { default: solver } = await import(`App/Domain/Solvers/${day.location}/${part}.ts`);
        solvers.push(solver as Solver);
      } catch (error) {}
    }
  }
  return solvers;
};

test("solver - day {day} part {part}")
  .with(async () => await getSolvers())
  .run(async ({ assert }, solver: Solver) => {
    assert.equal(await solver.solve(1), solver.expectedResult[0]);
    assert.equal(await solver.solve(2), solver.expectedResult[1]);
  });
