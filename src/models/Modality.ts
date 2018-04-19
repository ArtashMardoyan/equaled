'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const modalitySchema: Schema = new Schema({
      type: {
        type: String,
        required: true,
        enum: ['whole_class', 'groups', 'pairs', 'individual']
      },
      say: {
        type: String,
        required: true,
      },
      ask: {
        type: String,
        required: true
      },
      discuss: {
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

modalitySchema.plugin(mongoosePaginate);

export default model('Modality', modalitySchema);
