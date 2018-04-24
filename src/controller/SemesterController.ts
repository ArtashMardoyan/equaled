'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Semester from './../models/Semester';

class SemesterController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Semester.paginate({}, {
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
      Semester.findById(req.params.id)
          .then((semester) => MagicResponse.ok(res, semester))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionCreate(req: Request, res: Response): any {
    try {
      const result = _.pick(req.body, 'title', 'active', 'year', 'start_date',
          'end_date', 'type', 'courseId');

      return Semester.create(result)
          .then((data) => MagicResponse.created(res, data))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Semester.findById(req.params.id)
          .then((semester) => {
            if (_.isEmpty(semester)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body, 'title', 'active', 'year', 'start_date',
                'end_date', 'type', 'courseId');

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
      return Semester.findById(req.params.id)
          .then((semester) => {
            if (_.isEmpty(semester)) {
              return MagicResponse.notFound(res);
            }

            return semester.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }
}

export default new SemesterController();
