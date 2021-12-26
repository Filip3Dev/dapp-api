'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  url: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  fileId: {
    type: String,
    required: true,
    unique: true
  },
  inUse: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Images', schema)