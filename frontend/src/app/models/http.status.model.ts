
export enum CodeEnum {
    OK, BAD_REQUEST, ERROR
}

export default interface IStatus {
    status: CodeEnum,
    message: string
}

export function createStatus(code: number, message: string): IStatus {
    let status = CodeEnum.ERROR;
    if(code == 200 || code == 201 || code == 204) {
        status = CodeEnum.OK
    }
    if(code == 400) {
        status = CodeEnum.BAD_REQUEST
    }

    return { status, message }
}