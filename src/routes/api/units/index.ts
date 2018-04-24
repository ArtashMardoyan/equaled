'use strict';

import UnitController from './../../../controller/UnitController';

module.exports.autoroute = {
  get: {
    '/': [
      UnitController.actionIndex
    ],
    '/:id': [
      UnitController.actionGet
    ]
  },
  post: {
    '/': [
      UnitController.actionCreate
    ]
  },
  put: {
    '/:id': [
      UnitController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      UnitController.actionDelete
    ]
  }
};
