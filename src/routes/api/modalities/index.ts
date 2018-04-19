'use strict';

import ModalitiesController from './../../../controller/ModalitiesController';

module.exports.autoroute = {
  get: {
    '/': [
      ModalitiesController.actionIndex
    ],
    '/:id': [
      ModalitiesController.actionView
    ]
  },
  post: {
    '/': [
      ModalitiesController.actionCreate
    ]
  },
  put: {
    '/:id': [
      ModalitiesController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      ModalitiesController.actionDelete
    ]
  }
};
