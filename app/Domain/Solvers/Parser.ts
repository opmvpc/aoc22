export default abstract class Parser {
  public abstract parse(day: number, number: number): Promise<any>;
}
