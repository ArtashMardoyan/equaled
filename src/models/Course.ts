'use strict';

import {model, Schema} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const courseSchema: Schema = new Schema({
      title: {
        type: String,
        required: true
      },
      category: {
        type: String,
      },
      description: {
        type: String,
        required: true
      },
      objective: {
        type: String,
        required: true
      },
      competencies: {
        type: String,
        required: true
      },
      course_project: {
        type: String,
        required: true
      },
      diagnostic: {
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

courseSchema.plugin(mongoosePaginate);

export default model('Course', courseSchema);
