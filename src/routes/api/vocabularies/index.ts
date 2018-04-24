'use strict';

import VocabularyController from './../../../controller/VocabularyController';

module.exports.autoroute = {
  get: {
    '/': [
      VocabularyController.actionIndex
    ],
    '/:id': [
      VocabularyController.actionGet
    ]
  },
  post: {
    '/': [
      VocabularyController.actionCreate
    ]
  },
  put: {
    '/:id': [
      VocabularyController.actionUpdate
    ]
  },
  delete: {
    '/:id': [
      VocabularyController.actionDelete
    ]
  }
};
