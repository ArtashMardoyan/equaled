'use strict';

import {Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const activityStepSchema: Schema = new Schema({
      title: {
        type: String,
        required: true
      },
      shortDescription: {
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
      teacherTips: [{
        type: Number,
        required: true
      }],
      commonMisconceptions: [{
        type: String,
        required: true
      }],
      commonQuestions: [{
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
      phase: {
        type: String,
        required: true,
        enum: ['test1', 'test2', 'test3', 'test4']
      },
      duration: {
        type: Number,
      },
      additionalInfo: {
        type: String
      },
      contentType: {
        type: String,
        enum: ['video', 'image', 'html']
      },
      defaultModality: [{
        type: Schema.Types.ObjectId,
        ref: 'Modality',
        autopopulate: true
      }],
      alternativeModality: [{
        type: Schema.Types.ObjectId,
        ref: 'Modality',
        autopopulate: true
      }],
      vocabulary: {
        type: Schema.Types.ObjectId,
        ref: 'Vocabulary',
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

activityStepSchema.plugin(mongoosePaginate);

export default model('ActivityStep', activityStepSchema);
