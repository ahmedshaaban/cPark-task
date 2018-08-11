import Report from './src/models/report';

const mongoose = require('mongoose');

require('dotenv').config();

const { DB_HOST, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`);

const initReportArr = [
  {
    title: 'madenity',
    coordinates: [30.08, 31.62],
  },
  {
    title: 'auc',
    coordinates: [30.02, 31.50],
  },
  {
    title: 'guc',
    coordinates: [29.98, 31.44],
  },
];

const promiseArr = [];

initReportArr.forEach((report) => {
  promiseArr.push(new Report(report).save());
});


Promise.all(promiseArr).then(() => {
  console.log('Done init DB');
  process.exit();
});
