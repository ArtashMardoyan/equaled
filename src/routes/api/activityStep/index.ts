'use strict';

import ActivitiesStepController from './../../../controller/ActivitiesStepController';

module.exports.autoroute = {
  get: {
    '/': [
      ActivitiesStepController.actionIndex
    ],
    '/:id': [
      ActivitiesStepController.actionView
    ]
  },
  post: {
    '/': [
      ActivitiesStepController.actionCreate
    ]
  },
  put: {
    '/:id': [
      ActivitiesStepController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      ActivitiesStepController.actionDelete
    ]
  }
};
