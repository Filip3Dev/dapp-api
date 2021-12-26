"use strict";
const connectToDatabase = require("../db");
const mongoose = require("mongoose");
const modelImage = require('../models/images');

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,GET",
  'Accept': 'application/json;charset=utf-8'
}

exports.handler = async function (event, context) {
  await connectToDatabase();
  try {
    let list = await modelImage.find({ inUse: { "$ne": true } });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: list }),
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