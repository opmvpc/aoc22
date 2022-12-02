export default abstract class AbstractParser {
  public abstract parse(day: number, number: number): Promise<any>;
}
