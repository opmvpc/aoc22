export default class Result {
  public day: number;
  public part: number;
  public fileNumber: number;
  public result: any;
  public expectedResult: number;
  public time: number;

  constructor(
    day: number,
    part: number,
    fileNumber: number,
    result: any,
    expectedResult: number,
    time: number
  ) {
    this.day = day;
    this.part = part;
    this.fileNumber = fileNumber;
    this.result = result;
    this.expectedResult = expectedResult;
    this.time = time;
  }
}
