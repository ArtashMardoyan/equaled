'use strict';

import ActivitiesController from '../../../controller/ActivitiesController';

module.exports.autoroute = {
    get: {
        '/': [
            ActivitiesController.actionIndex
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
