'use strict';

import {model, Schema} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const vocabularySchema: Schema = new Schema({
      vocabulary: {
        type: [String],
        required: true,
        validate: {
          validator: function (array) {
            return array.length !== 0;
          }
        }
      },
      linked: {
        type: Schema.Types.ObjectId
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

vocabularySchema.plugin(mongoosePaginate);

export default model('Vocabulary', vocabularySchema);
