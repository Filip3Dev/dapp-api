"use strict";
const connectToDatabase = require("../db");
const mongoose = require("mongoose");
const modelNFT = require('../models/nfts');
const modelImage = require('../models/images');
const modelLogs = require('../models/logs');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
}

exports.handler = async function (event, context) {
  if(event.httpMethod === 'OPTIONS'){ return { statusCode: 200, headers: headers } };
  await connectToDatabase();
  try {
    let body = JSON.parse(event.body);
    let logs = await modelLogs.create(body.user_info);
    let rarity = generateRandomIntegerInRange(1, 8);
    let power = generateRandomIntegerInRange(1, 70);
    let weight = generateRandomIntegerInRange(1, 70);
    let attributes = [
      {
        "trait_type": "Rarity",
        "value": rarity
      },
      {
        "trait_type": "Power",
        "value": power
      },
      {
        "trait_type": "Weight",
        "value": weight
      }
    ]
    let payload = { ...body.payload, attributes };
    let saver = await modelNFT.create(payload);
    saver = await saver.save();
    console.log('Register img NFT: ', body.payload.image_data);
    await modelImage.findByIdAndUpdate(body.payload.image_data, {
      $set: {
        inUse: true,
      },
    })

    await modelLogs.findByIdAndUpdate(logs._id, {
      $set: {
        token: saver._id,
      },
    })

    return {
      statusCode: 201,
      body: JSON.stringify({ data: saver }),
      headers: headers
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
      headers: headers
    };
  }
}

function generateRandomIntegerInRange(min, max) {
  return Math.round(max / (Math.random() * max + min));
}