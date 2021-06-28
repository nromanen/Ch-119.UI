export default class ApiError extends Error {
    constructor(status: string, message: string) {
        super();
        this.name = status
        this.message = message
    }

    static badRequest() {
        return new ApiError('400', 'Invalid Data!');
    }

    static internal() {
        return new ApiError('500', 'Not authorized');
    }

    static forbidden() {
        return new ApiError('403', 'Forbidden error');
    }

    static conflict(message: string) {
        return new ApiError('401', message);
    }

    static unathorized() {
        return new ApiError('401', 'Invalid Data!');
    }
}