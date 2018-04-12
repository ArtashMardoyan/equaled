'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const activitySchema: Schema = new Schema({
        title: {
            type: String,
            required: true
        },
        shortDescription: {
            type: String,
            required: true,
        },
        objectives: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        competencies: [{
            type: String,
            required: true
        }],
        templateType: {
            type: String,
            required: true,
            enum: ['content', 'assessment']
        },
        type: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        modality: {
            type: String,
            required: true,
            enum: ['whole_class', 'groups', 'pairs', 'individual']
        },
        activitySteps: [{
            type: Schema.Types.ObjectId,
            ref: 'ActivityStep',
            autopopulate: true
        }]
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);

activitySchema.plugin(mongoosePaginate);

export default model('Activity', activitySchema);
