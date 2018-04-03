'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/rest/magicResponse';
import Activities from './../models/Activities';

class ActivitiesController {

    public actionIndex(req: Request, res: Response): any {
        try {
            Activities.paginate({}, {
                page: req.query.page,
                limit: req.query.limit

            })
                .then((activities) => MagicResponse.ok(res, activities))
                .catch(() => MagicResponse.internalServer(res));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }

    public actionCreate(req: Request, res: Response): any {
        try {
            const result = _.pick(req.body, 'title', 'shortDescription',
                'objectives', 'duration', 'competencies', 'templateType', 'modality');

            return Activities.create(result)
                .then((data) => MagicResponse.created(res, data))
                .catch((err) => MagicResponse.unprocessableEntity(res, err));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }

    public actionUpdate(req: Request, res: Response): any {
        try {
            Activities.findById(req.params.id)
                .then((activities) => {
                    if (_.isEmpty(activities)) {
                        return MagicResponse.notFound(res);
                    }

                    const result = _.pick(req.body, 'title', 'shortDescription',
                        'objectives', 'duration', 'competencies', 'templateType', 'modality');

                    _.assign(activities, result);

                    activities.save()
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
            return Activities.findById(req.params.id)
                .then((activities) => {
                    if (_.isEmpty(activities)) {
                        return MagicResponse.notFound(res);
                    }

                    return activities.remove()
                        .then(() => MagicResponse.noContent(res));
                })
                .catch(() => MagicResponse.internalServer(res));
        } catch (ex) {
            return MagicResponse.internalServer(res);
        }
    }
}

export default new ActivitiesController();
