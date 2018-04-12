'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const phaseSchema: Schema = new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        activities: [{
            type: Schema.Types.ObjectId,
            ref: 'Activity',
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

phaseSchema.plugin(mongoosePaginate);

export default model('Phase', phaseSchema);
