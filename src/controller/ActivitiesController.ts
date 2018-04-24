'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Activity from './../models/Activity';

class ActivityController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Activity.paginate({}, {
        page: req.query.page,
        limit: req.query.limit,
        populate: ['activitySteps']
      })
          .then((activity) => MagicResponse.ok(res, activity))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionView(req: Request, res: Response): any {
    try {
      Activity.findOne({
        _id: req.params.id
      })
          .populate({
            path: 'activitySteps',
            populate: ['defaultModality', 'alternativeModality']
          })
          .then((activity) => {
            if (_.isEmpty(activity)) {
              return MagicResponse.notFound(res);
            }

            return MagicResponse.ok(res, activity);
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionCreate(req: Request, res: Response): any {
    try {
      const result = _.pick(req.body,
          'title',
          'shortDescription',
          'objectives',
          'duration',
          'competencies',
          'templateType',
          'type',
          'thumbnail',
          'modality',
          'activitySteps');

      return Activity.create(result)
          .then((data) => MagicResponse.created(res, data))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Activity.findById(req.params.id)
          .then((activity) => {
            if (_.isEmpty(activity)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body,
                'title',
                'shortDescription',
                'objectives',
                'duration',
                'competencies',
                'templateType',
                'type',
                'thumbnail',
                'modality',
                'activitySteps');

            _.assign(activity, result);

            activity.save()
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
      return Activity.findById(req.params.id)
          .then((activity) => {
            if (_.isEmpty(activity)) {
              return MagicResponse.notFound(res);
            }

            return activity.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }
}

export default new ActivityController();
