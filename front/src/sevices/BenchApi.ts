import Result from "../types/Result";

export class BenchApi {
  public static async results(
    day: number,
    part: number,
    fileNumber: number,
    times: number
  ): Promise<Result | null> {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/results/day/${day}/part/${part}/file/${fileNumber}/times/${times}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.result === null) {
      return null;
    }
    return this.toResult(data.result);
  }

  private static toResult(data: any): Result {
    return new Result(
      data.day,
      data.part,
      data.fileNumber,
      data.result,
      data.expectedResult,
      data.time
    );
  }

  public static async days(): Promise<number> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/days`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return Number(data.days);
  }
}
