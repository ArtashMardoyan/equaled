'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Lesson from './../models/Lesson';

class LessonController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Lesson.paginate({}, {
        page: req.query.page,
        limit: req.query.limit,
        populate: [{
          path: 'phases',
          populate: [{
            path: 'activities',
            populate: [{
              path: 'activitySteps',
              populate: ['defaultModality', 'alternativeModality']
            }]
          }]
        }]

      })
          .then((lesson) => MagicResponse.ok(res, lesson))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionView(req: Request, res: Response): any {
    try {
      Lesson.findOne({
        _id: req.params.id
      })
          .populate({
            path: 'phases',
            populate: {
              path: 'activities',
              populate: {
                path: 'activitySteps',
                populate: ['defaultModality', 'alternativeModality']
              }
            }
          })
          .then((lesson) => {
            if (_.isEmpty(lesson)) {
              return MagicResponse.notFound(res);
            }

            return MagicResponse.ok(res, lesson);
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
          'overview',
          'hasCheckList',
          'checklist',
          'backgroundInfo',
          'phases');

      return Lesson.create(result)
          .then((lesson) => MagicResponse.created(res, lesson))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Lesson.findById(req.params.id)
          .then((lesson) => {
            if (_.isEmpty(lesson)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body,
                'title',
                'overview',
                'hasCheckList',
                'checklist',
                'backgroundInfo',
                'phases');

            _.assign(lesson, result);

            lesson.save()
                .then((lesson) => MagicResponse.ok(res, lesson))
                .catch((err) => MagicResponse.unprocessableEntity(res, err));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionDelete(req: Request, res: Response): any {
    try {
      return Lesson.findById(req.params.id)
          .then((lesson) => {
            if (_.isEmpty(lesson)) {
              return MagicResponse.notFound(res);
            }

            return lesson.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }
}

export default new LessonController();
