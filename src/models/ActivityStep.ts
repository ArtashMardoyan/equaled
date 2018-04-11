'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const activityStepSchema: Schema = new Schema({
        title: {
            type: String,
            required: true
        },
        intro: {
            type: String,
            required: true,
        },
        studentInstruction: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['slide', 'video', 'quiz', 'interactive']
        },
        contentRef: {
            type: String,
            required: true
        },
        defaultModality: {
            type: Schema.Types.ObjectId,
            ref: 'Modality',
            autopopulate: true
        },
        alternativeModality: [{
            type: Schema.Types.ObjectId,
            ref: 'Modality',
            autopopulate: true
        }],
        teacherTips: [{
            type: Number,
            required: true
        }],
        misconceptions: [{
            type: String,
            required: true
        }],
        questions: [{
            type: String,
            required: true
        }],
        answers: [{
            type: String,
            required: true
        }],
        vocabularyWords: [{
            type: String,
            required: true
        }],
        skills: [{
            type: String,
            required: true
        }],
        vocabularyRef: {
            type: String,
            required: true
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

activityStepSchema.plugin(mongoosePaginate);

export default model('ActivityStep', activityStepSchema);
