import { HttpErrorResponse } from "@angular/common/http";

export class ServerError extends Error {

    public constructor(message: string) {
        super(message);
    }
}

export function makeError(response: HttpErrorResponse) {
    return new HttpServerError(response.message, response);
}

export class HttpServerError extends Error {

    private readonly response;

    public constructor(message: string, response: HttpErrorResponse) {
        super(message);
        this.response = response;
    }

    get statusText() { return this.response.statusText; }
    get status() { return this.response.status; }
    get originalError() { return this.response.error; }
}