import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Bench from "App/Domain/Solvers/Bench";
import Result from "App/Domain/Solvers/Contracts/Result";
import Logger from "@ioc:Adonis/Core/Logger";

export default class SolversController {
  public async results(ctx: HttpContextContract) {
    const { day, part, file, times } = ctx.params;
    let result: Result | null = null;
    try {
      result = await new Bench().results(day, part, file, times);
    } catch (error) {
      Logger.error(error);
    }
    return ctx.response.send({ result: result });
  }

  public async days(ctx: HttpContextContract) {
    const days = Math.max(...(
      await Drive.use("localInputFiles")
        .list("/")
        .filter((x) => /(1[0-9]|2[0-5]|[1-9])/.test(x.location))
        .toArray()
    ).map((x) => Number(x.location)));
    return ctx.response.send({ days: days });
  }
}
