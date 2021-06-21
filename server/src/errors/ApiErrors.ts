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
        return new ApiError('403', 'Server error');
    }

    static conflict() {
        return new ApiError('409', 'This data already exist');
    }

    static unathorized() {
        return new ApiError('401', 'Invalid Data!');
    }
}