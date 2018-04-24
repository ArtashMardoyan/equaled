'use strict';

import PhasesController from './../../../controller/PhasesController';

module.exports.autoroute = {
  get: {
    '/': [
      PhasesController.actionIndex
    ],
    '/:id': [
      PhasesController.actionView
    ]
  },
  post: {
    '/': [
      PhasesController.actionCreate
    ]
  },
  put: {
    '/:id': [
      PhasesController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      PhasesController.actionDelete
    ]
  }
};
