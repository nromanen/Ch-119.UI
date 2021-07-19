import {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS,
  FORBIDDEN_STATUS,
  INTERNAL_STATUS,
  UNATHORIZED_STATUS,
} from '../constants/errors';

export default class ApiError extends Error {
  constructor(status: string, message: string) {
    super();
    this.name = status;
    this.message = message;
  }

  static badRequest() {
    return new ApiError(BAD_REQUEST_STATUS, 'Invalid Data!');
  }

  static internal() {
    return new ApiError(INTERNAL_STATUS, 'Not authorized');
  }

  static forbidden() {
    return new ApiError(FORBIDDEN_STATUS, 'Forbidden error');
  }

  static conflict(message: string) {
    return new ApiError(CONFLICT_STATUS, message);
  }

  static unathorized() {
    return new ApiError(UNATHORIZED_STATUS, 'Invalid Data!');
  }
}
