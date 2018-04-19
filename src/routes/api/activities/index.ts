'use strict';

import ActivitiesController from './../../../controller/ActivitiesController';

module.exports.autoroute = {
  get: {
    '/': [
      ActivitiesController.actionIndex
    ],
    '/:id': [
      ActivitiesController.actionView
    ]
  },
  post: {
    '/': [
      ActivitiesController.actionCreate
    ]
  },
  put: {
    '/:id': [
      ActivitiesController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      ActivitiesController.actionDelete
    ]
  }
};
