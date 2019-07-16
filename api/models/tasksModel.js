'use strict';

const mongoose = require('mongoose'),
  Schema       = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the task',
    unique: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);