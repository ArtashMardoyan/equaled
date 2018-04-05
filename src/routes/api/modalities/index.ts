'use strict';

import ModalityController from './../../../controller/ModalityController';

module.exports.autoroute = {
    get: {
        '/': [
            ModalityController.actionIndex
        ]
    },
    post: {
        '/': [
            ModalityController.actionCreate
        ]
    },
    put: {
        '/:id': [
            ModalityController.actionUpdate
        ]
    },
    delete: {
        '/:id': [
            ModalityController.actionDelete
        ]
    }
};
