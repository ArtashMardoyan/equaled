'use strict';

import * as _ from 'underscore';

import HttpStatus from '../../magicResponse/HttpStatus';

/*
 * HttpException represents an exception caused by an improper request of the end-user.
 *
 * HttpException can be differentiated via its [[statusCode]] property value which
 * keeps a standard HTTP status code (e.g. 404, 500).
 */
export default class HttpException extends Error {

    public name = 'HttpException';
    public statusCode;
    public statusName;
    public message;
    public errors = [];

    constructor(httpStatus: any, message: string, errors: any) {
        super(message);

        let statusCode;
        let statusName;
        switch (typeof httpStatus) {
            case 'number':
                httpStatus = HttpStatus[httpStatus];
                if (!_.isUndefined(httpStatus)) {
                    statusCode = httpStatus.code;
                    statusName = httpStatus.name;
                }
                break;
            case 'object':
                statusCode = httpStatus.code;
                statusName = httpStatus.name;
                break;
            default:
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR.code;
                statusName = HttpStatus.INTERNAL_SERVER_ERROR.name;
        }

        this.statusCode = statusCode;
        this.statusName = statusName;
        this.message = message;
        this.errors = errors;
    }
}
