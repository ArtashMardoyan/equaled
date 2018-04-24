'use strict';

import SemesterController from './../../../controller/SemesterController';

module.exports.autoroute = {
  get: {
    '/': [
      SemesterController.actionIndex
    ],
    '/:id': [
      SemesterController.actionGet
    ]
  },
  post: {
    '/': [
      SemesterController.actionCreate
    ]
  },
  put: {
    '/:id': [
      SemesterController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      SemesterController.actionDelete
    ]
  }
};
