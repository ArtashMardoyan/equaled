'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const lessonSchema: Schema = new Schema({
        title: {
            type: String,
            required: true
        },
        overview: {
            type: String,
            required: true,
        },
        hasCheckList: {
            type: Boolean,
            default: false
        },
        checklist: {
            equipment: {
                type: String
            },
            printOuts: {
                type: String
            },
            instructions: {
                type: String
            }
        },
        backgroundInfo: {
            approach: {
                type: String
            },
            content: {
                type: String
            },
            standards: {
                type: Array
            },
            competencies: {
                type: Array
            }
        },
        lessonPhases: [{
            phaseName: {
                type: String
            },
            description: {
                type: String
            },
            duration: {
                type: Number
            },
        }],
        activity: {
            type: Schema.Types.ObjectId,
            ref: 'Activity',
            autopopulate: true
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

lessonSchema.plugin(mongoosePaginate);

export default model('Lesson', lessonSchema);
