'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  hostname: {
    type: String,
  },
  ip: {
    type: String,
    required: false
  },
  loc: {
    type: String,
    required: false
  },
  org: {
    type: String,
    required: false
  },
  postal: {
    type: String,
    required: false
  },
  region: {
    type: String,
    required: false
  },
  timezone: {
    type: String,
    required: false
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nfts'
  },
}, { timestamps: true });

module.exports = mongoose.model('Logs', schema)