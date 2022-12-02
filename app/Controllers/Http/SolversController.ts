import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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
}
