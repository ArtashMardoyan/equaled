'use strict';

import LessonActivitiesController from './../../../controller/LessonActivitiesController';

module.exports.autoroute = {
  get: {
    '/': [
      LessonActivitiesController.actionIndex
    ]
  },
  post: {
    '/': [
      LessonActivitiesController.actionCreate
    ]
  },
  put: {
    '/:id': [
      LessonActivitiesController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      LessonActivitiesController.actionDelete
    ]
  }
};
