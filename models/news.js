'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  slug: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  date_publish: {
    type: String,
    required: true
  },
  date_publish: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  site_name: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model('News', schema)