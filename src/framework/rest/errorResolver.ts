'use strict';

import * as _ from 'underscore';
import {Request, Response, NextFunction} from 'express';

import HttpStatus from './../http/enums/HttpStatus';
import config from '../../config';

interface Error {
    name?: string;
    message?: string;
    statusCode?: number;
    statusName?: string;
}

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code;
    const statusName = err.statusName || HttpStatus.INTERNAL_SERVER_ERROR.name;

    const response: any = {
        code: statusCode,
        name: statusName,
        message: err.name === 'HttpException' ? err.message : null
    };

    if (config.get('NODE_ENV') === 'development') {
        response.trace = _.omit(err, ['name', 'message', 'statusCode', 'statusName']);
        response.trace = _.pick(response.trace, (value) => !_.isEmpty(value));
    }

    return res.status(statusCode).json(
        _.pick(response, (value) => _.isNumber(value) || !_.isEmpty(value))
    );
};
