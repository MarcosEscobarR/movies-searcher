export class Result {
  constructor(public readonly status: number, public readonly data?: unknown) {}

  static ok(data?: unknown) {
    return data ? new Result(200, data) : new Result(200);
  }
  static created() {
    return new Result(201);
  }
  static badRequest(data: unknown) {
    return new Result(400, data);
  }
  static internalServerError(data?: unknown) {
    return new Result(500, data);
  }
  static notFound(data?: unknown) {
    return new Result(404, data);
  }

  static unauthorized(data?: unknown) {
    return new Result(401, data);
  }

  static statusCode(status: number, data?: unknown) {
    return new Result(status, data);
  }

  //other status codes
}
