import Parser from "../Parser";
import Drive from "@ioc:Adonis/Core/Drive";

class P extends Parser {
  public async parse(day: number, fileNumber: number): Promise<any> {
    const content = await this.getContent(day, fileNumber);
    const input = content?.split("\n\n").map((block) =>
      block
        .split("\n")
        .filter((number) => number !== "")
        .map((number) => parseInt(number))
    );
    return input;
  }

  public async getContent(day: number, fileNumber: number): Promise<string | undefined> {
    try {
      return await (await Drive.use("localInputFiles").get(`${day}/${fileNumber}.txt`)).toString();
    } catch (err) {
      throw new Error("Error reading file from disk: " + err);
    }
  }
}

export default new P();
