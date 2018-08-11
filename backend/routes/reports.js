const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { DB_HOST, DB_NAME } = process.env;
const Report = require('../models/report');

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`);

/* GET reports within 10 kms listing. */
router.get('/:lat/:long', async (req, res) => {
  const { lat, long } = req.params;
  const reports = await Report.find({
    coordinates: {
      $geoWithin: {
        $center: [[lat, long], 10],
      },
    },
  });
  return res.send(reports);
});

/* POST a new report */
router.post('/', (req, res, next) => {
  const { title, time, coordinates } = req.body;
  Report.create({ title, time, coordinates })
    .then(report => res.send(report))
    .catch(err => next(err));
});

module.exports = router;
