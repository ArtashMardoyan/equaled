'use strict';

import CourseController from './../../../controller/CourseController';

module.exports.autoroute = {
  get: {
    '/': [
      CourseController.actionIndex
    ],
    '/:id': [
      CourseController.actionGet
    ]
  },
  post: {
    '/': [
      CourseController.actionCreate
    ]
  },
  put: {
    '/:id': [
      CourseController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      CourseController.actionDelete
    ]
  }
};
