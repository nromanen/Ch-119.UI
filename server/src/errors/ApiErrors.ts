export default class ApiError extends Error {
    constructor(status: string, message: string) {
        super();
        this.name = status
        this.message = message
    }

    static badRequest(message: string) {
        return new ApiError('400', message)
    }

    static internal(message: string) {
        return new ApiError('500', message)
    }

    static forbidden(message: string) {
        return new ApiError('403', message)
    }

    static conflict(message: string) {
        return new ApiError('409', message)
    }

    static unathorized(message: string) {
        return new ApiError('401', message)
    }
}