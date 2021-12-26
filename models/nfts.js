'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  image_data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Images'
  },
  external_url: {
    type: String,
    required: false
  },
  creator: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  attributes: [
    {
      trait_type: String,
      value: String
    }
  ],
  background_color: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Nfts', schema)