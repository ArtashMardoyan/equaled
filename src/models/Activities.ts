'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const activitiesSchema: Schema = new Schema({
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
        competencies: {
            type: String,
            required: true
        },
        templateType: {
            type: String,
            required: true,
            enum: ['content', 'assessment']
        },
        modality: {
            type: String,
            required: true,
            enum: ['whole_class', 'groups', 'pairs', 'individual']
        }
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);

activitiesSchema.plugin(mongoosePaginate);

export default model('Activities', activitiesSchema);
