const mongoose = require('mongoose');

require('dotenv').config();

const { DB_HOST, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`);

const Report = require('./models/report');

const initReportArr = [
  {
    title: 'madenity',
    position: {
      latitude: 30.08,
      longitude: 31.62,
    },
  },
  {
    title: 'auc',
    position: {
      latitude: 30.02,
      longitude: 31.50,
    },
  },
  {
    title: 'guc',
    position: {
      latitude: 29.98,
      longitude: 31.44,
    },
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
