import { Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ErrorResponseData, SuccessResponseData } from "../../@types";

class ResponseHandler {
  constructor(private res: Response) {}

  public successResponse<T>(data: T, statusCode = StatusCodes.OK) {
    const successResponse: SuccessResponseData<T> = {
      success: true,
      data,
      statusCode,
    };
    this.res.status(statusCode).json(successResponse);
  }

  public errorResponse(
    type: string,
    message: string,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    const errorResponse: ErrorResponseData = {
      success: false,
      error: {
        type: type || getReasonPhrase(statusCode),
        message,
        statusCode,
      },
    };
    this.res.status(statusCode).json(errorResponse);
  }
}

const response = (res: Response) => {
  return new ResponseHandler(res);
};

export default response;