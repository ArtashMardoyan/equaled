'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Unit from './../models/Unit';
import Phase from '../models/Phase';

class UnitController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Unit.paginate({}, {
        page: req.query.page,
        limit: req.query.limit
      })
          .then((semester) => MagicResponse.ok(res, semester))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionGet(req: Request, res: Response): any {
    try {
      Unit.findById(req.params.id)
          .populate('lessons.lessonId')
          .then((semester) => MagicResponse.ok(res, semester))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionCreate(req: Request, res: Response): any {
    try {
      const result = _.pick(req.body, 'title', 'unit_order', 'active', 'summary',
          'unit_guide', 'lessons', 'semesterId');

      return Unit.create(result)
          .then((data) => MagicResponse.created(res, data))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Unit.findById(req.params.id)
          .then((semester) => {
            if (_.isEmpty(semester)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body, 'title', 'unit_order', 'active', 'summary',
                'unit_guide', 'lessons', 'semesterId');

            _.assign(semester, result);

            semester.save()
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
      return Unit.findById(req.params.id)
          .then((unit) => {
            if (_.isEmpty(unit)) {
              return MagicResponse.notFound(res);
            }

            return unit.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }
}

export default new UnitController();
