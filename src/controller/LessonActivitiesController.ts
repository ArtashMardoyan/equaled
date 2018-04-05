'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import LessonActivity from './../models/LessonActivity';

class LessonActivitiesController {

    public actionIndex(req: Request, res: Response): any {
        try {
            LessonActivity.paginate({}, {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['lessonId', 'activityId']
            })
                .then((data) => MagicResponse.ok(res, data))
                .catch(() => MagicResponse.internalServer(res));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }

    public actionCreate(req: Request, res: Response): any {
        try {
            const result = _.pick(req.body, 'lessonId', 'activityId', 'phaseTitle');

            return LessonActivity.create(result)
                .then((data) => MagicResponse.created(res, data))
                .catch((err) => MagicResponse.unprocessableEntity(res, err));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }

    public actionUpdate(req: Request, res: Response): any {
        try {
            LessonActivity.findById(req.params.id)
                .then((lessonActivity) => {
                    if (_.isEmpty(lessonActivity)) {
                        return MagicResponse.notFound(res);
                    }

                    const result = _.pick(req.body, 'lessonId', 'activityId', 'phaseTitle');

                    _.assign(lessonActivity, result);

                    lessonActivity.save()
                        .then((data) => MagicResponse.ok(res, data))
                        .catch((err) => MagicResponse.unprocessableEntity(res, err));
                })
                .catch(() => MagicResponse.internalServer(res));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }

    public actionDelete(req: Request, res: Response): any {
        try {
            return LessonActivity.findById(req.params.id)
                .then((lessonActivity) => {
                    if (_.isEmpty(lessonActivity)) {
                        return MagicResponse.notFound(res);
                    }

                    return lessonActivity.remove()
                        .then(() => MagicResponse.noContent(res));
                })
                .catch(() => MagicResponse.internalServer(res));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }
}

export default new LessonActivitiesController();
