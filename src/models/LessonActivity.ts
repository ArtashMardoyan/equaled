'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const lessonActivitySchema: Schema = new Schema({
      lessonId: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
        autopopulate: true
      },
      activityId: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: true,
        autopopulate: true
      },
      phaseTitle: {
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

lessonActivitySchema.plugin(mongoosePaginate);

export default model('LessonActivity', lessonActivitySchema);
