/* global use, db */
// MongoDB Playground - Extended Analytics (Updated date to Aug 15, 2015)

use('mongodbVSCodePlaygroundDB');

// Insert documents (optional: skip if data already exists)
/*
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);
*/

// 1️⃣ Count sales on August 15, 2015
let salesOnAug15th = db.getCollection('sales').find({
  date: { $gte: new Date('2015-08-15T00:00:00Z'), $lt: new Date('2015-08-16T00:00:00Z') }
}).count();

console.log(`${salesOnAug15th} sales occurred on August 15, 2015.`);

// 2️⃣ Aggregate: total and average sale amount per item in 2014
let avgAggregation = db.getCollection('sales').aggregate([
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  { $group: {
    _id: '$item',
    totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
    averageSaleAmount: { $avg: { $multiply: ['$price', '$quantity'] } },
    totalQuantitySold: { $sum: '$quantity' },
    transactions: { $sum: 1 }
  }},
  { $sort: { totalSaleAmount: -1 } }
]).toArray();

console.log('Total & average sales per item in 2014:', avgAggregation);

// 3️⃣ Aggregate: only for a specific item, e.g., 'abc'
let specificItem = 'abc';
let filteredAggregation = db.getCollection('sales').aggregate([
  { $match: {
    item: specificItem,
    date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') }
  }},
  { $group: {
    _id: '$item',
    totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
    averageSaleAmount: { $avg: { $multiply: ['$price', '$quantity'] } },
    totalQuantitySold: { $sum: '$quantity' },
    transactions: { $sum: 1 }
  }}
]).toArray();

console.log(`Sales stats for item '${specificItem}' in 2014:`, filteredAggregation);
