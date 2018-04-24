'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Course from './../models/Course';

class CourseController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Course.paginate({}, {
        page: req.query.page,
        limit: req.query.limit

      })
          .then((course) => MagicResponse.ok(res, course))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionGet(req: Request, res: Response): any {
    try {
      Course.findById(req.params.id)
          .then((course) => MagicResponse.ok(res, course))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionCreate(req: Request, res: Response): any {
    try {
      const result = _.pick(req.body, 'title', 'category', 'description', 'objective',
          'competencies', 'course_project', 'diagnostic');

      return Course.create(result)
          .then((data) => MagicResponse.created(res, data))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Course.findById(req.params.id)
          .then((course) => {
            if (_.isEmpty(course)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body, 'title', 'category', 'description', 'objective',
                'competencies', 'course_project', 'diagnostic');

            _.assign(course, result);

            course.save()
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
      return Course.findById(req.params.id)
          .then((course) => {
            if (_.isEmpty(course)) {
              return MagicResponse.notFound(res);
            }

            return course.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }
}

export default new CourseController();
