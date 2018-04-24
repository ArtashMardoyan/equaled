'use strict';

import {model, Schema} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const unitSchema: Schema = new Schema({
      title: {
        type: String,
        required: true
      },
      unit_order: {
        type: Number,
        required: true
      },
      active: {
        type: Boolean,
        default: true
      },
      summary: {
        text: {type: String, required: true},
        video_path: {type: String}
      },
      unit_guide: {
        text: {type: String},
        download_link: {type: String},
        size: {type: String}
      },
      lessons: [
        {
          lessonId: {
            type: Schema.Types.ObjectId,
            ref: 'Lesson',
            required: true
          },
          type: {
            type: String,
            enum: ['lesson', 'project', 'assessment'],
            default: 'lesson'
          },
          order: {type: Number, required: true},

        }
      ],
      semesterId: [{
        type: Schema.Types.ObjectId,
        ref: 'Semester',
        required: true,
      }],
    },
    {
      versionKey: false,
      timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
      }
    }
);

unitSchema.plugin(mongoosePaginate);

export default model('Unit', unitSchema);
