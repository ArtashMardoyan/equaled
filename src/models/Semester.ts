'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const semesterSchema: Schema = new Schema({
      title: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        default: true
      },
      year: {
        type: Number
      },
      start_date: {
        type: Date
      },
      end_date: {
        type: Date
      },
      type: {
        type: String,
        required: true,
        enum: ['fall', 'spring', 'all_year'],
        default: 'all_year'
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
      },
    },
    {
      versionKey: false,
      timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
      }
    }
);

semesterSchema.plugin(mongoosePaginate);

export default model('Semester', semesterSchema);
