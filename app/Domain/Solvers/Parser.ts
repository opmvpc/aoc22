import AbstractParser from "./Contracts/AbstractParser";
import Drive from "@ioc:Adonis/Core/Drive";

class Parser extends AbstractParser {
  public async parse(day: number, fileNumber: number): Promise<string> {
    const content = (await this.getContent(day, fileNumber)) ?? "";

    return content;
  }

  public async getContent(day: number, fileNumber: number): Promise<string | undefined> {
    try {
      return await (await Drive.use("localInputFiles").get(`${day}/${fileNumber}.txt`)).toString();
    } catch (err) {
      throw new Error("Error reading file from disk: " + err);
    }
  }
}

export default new Parser();
