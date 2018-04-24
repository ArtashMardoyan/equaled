'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Phase from './../models/Phase';

class PhaseController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Phase.paginate({}, {
        page: req.query.page,
        limit: req.query.limit,
        populate: [{
          path: 'activities',
          populate: [{
            path: 'activitySteps',
            populate: ['defaultModality', 'alternativeModality']
          }]
        }]
      })
          .then((phase) => MagicResponse.ok(res, phase))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionView(req: Request, res: Response): any {
    try {
      Phase.findOne({
        _id: req.params.id
      })
          .populate({
            path: 'activities',
            populate: {
              path: 'activitySteps',
              populate: ['defaultModality', 'alternativeModality']
            }
          })
          .then((phase) => {
            if (_.isEmpty(phase)) {
              return MagicResponse.notFound(res);
            }

            return MagicResponse.ok(res, phase);
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionCreate(req: Request, res: Response): any {
    try {
      const result = _.pick(req.body,
          'name',
          'description',
          'duration',
          'activities');

      return Phase.create(result)
          .then((phase) => MagicResponse.created(res, phase))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Phase.findById(req.params.id)
          .then((phase) => {
            if (_.isEmpty(phase)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body,
                'name',
                'description',
                'duration',
                'activities');

            _.assign(phase, result);

            phase.save()
                .then((phase) => MagicResponse.ok(res, phase))
                .catch((err) => MagicResponse.unprocessableEntity(res, err));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionDelete(req: Request, res: Response): any {
    try {
      return Phase.findById(req.params.id)
          .then((phase) => {
            if (_.isEmpty(phase)) {
              return MagicResponse.notFound(res);
            }

            return phase.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }
}

export default new PhaseController();
