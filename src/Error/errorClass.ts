export default class ErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public payload?: Object | Array<Object>
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.payload = payload;
  }
}
