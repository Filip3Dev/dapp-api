"use strict";
const connectToDatabase = require("../db");
const mongoose = require("mongoose");
const modelNFT = require('../models/nfts');
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
    let body = JSON.parse(event.body);
    let rarity = generateRandomIntegerInRange(0, 7);
    let power = generateRandomIntegerInRange(1, 70);
    let weight = generateRandomIntegerInRange(1, 60);
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
    let saver = await modelNFT.create({...body, attributes});
    saver = await saver.save();

    await modelImage.findByIdAndUpdate(body.image_data, {
      $set: {
        inUse: true,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ data: saver }),
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

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}