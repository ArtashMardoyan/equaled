'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import ActivityStep from './../models/ActivityStep';

class ActivitiesController {

    public actionIndex(req: Request, res: Response): any {
        try {
            ActivityStep.paginate({}, {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['alternativeModality', 'defaultModality']
            })
                .then((activitySteps) => MagicResponse.ok(res, activitySteps))
                .catch(() => MagicResponse.internalServer(res));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }

    public actionCreate(req: Request, res: Response): any {
        try {
            const result = _.pick(req.body, 'title', 'intro',
                'studentInstruction', 'type', 'contentRef', 'defaultModality', 'alternativeModality',
                'teacherTips', 'misconceptions', 'questions', 'answers', 'vocabularyWords', 'skills', 'vocabularyRef');

            return ActivityStep.create(result)
                .then((data) => MagicResponse.created(res, data))
                .catch((err) => MagicResponse.unprocessableEntity(res, err));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }

    public actionUpdate(req: Request, res: Response): any {
        try {
            ActivityStep.findById(req.params.id)
                .then((activityStep) => {
                    if (_.isEmpty(activityStep)) {
                        return MagicResponse.notFound(res);
                    }

                    const result = _.pick(req.body, 'title', 'intro',
                        'studentInstruction', 'type', 'contentRef', 'defaultModality', 'alternativeModality',
                        'teacherTips', 'misconceptions', 'questions', 'answers', 'vocabularyWords', 'skills', 'vocabularyRef');

                    _.assign(activityStep, result);

                    activityStep.save()
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
            return ActivityStep.findById(req.params.id)
                .then((activityStep) => {
                    if (_.isEmpty(activityStep)) {
                        return MagicResponse.notFound(res);
                    }

                    return activityStep.remove()
                        .then(() => MagicResponse.noContent(res));
                })
                .catch(() => MagicResponse.internalServer(res));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }
}

export default new ActivitiesController();
