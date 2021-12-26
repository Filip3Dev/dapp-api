"use strict";
const connectToDatabase = require("../db");
const mongoose = require("mongoose");
const modelNFT = require('../models/nfts');
require('../models/images');

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,GET",
  'Accept': 'application/json;charset=utf-8'
}

exports.handler = async function (event, context) {
  await connectToDatabase();
  try {
    let { creator } = event.queryStringParameters;
    let tokens = await modelNFT.find({ creator }).populate('image_data').lean();
    return {
      statusCode: 200,
      body: JSON.stringify({ tokens }),
      headers: headers
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({}),
    };
  }
}