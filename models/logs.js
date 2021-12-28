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
    required: true,
    unique: true
  },
  ip: {
    type: String,
    required: true,
    default: false
  },
  loc: {
    type: String,
    required: true,
    default: false
  },
  org: {
    type: String,
    required: true,
    default: false
  },
  postal: {
    type: String,
    required: true,
    default: false
  },
  region: {
    type: String,
    required: true,
    default: false
  },
  timezone: {
    type: String,
    required: true,
    default: false
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nfts'
  },
}, { timestamps: true });

module.exports = mongoose.model('Logs', schema)