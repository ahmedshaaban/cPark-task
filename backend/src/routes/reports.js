import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jwt-express';

import Report from '../models/report';

dotenv.config();

const router = express.Router();
const { DB_HOST, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`);

/* GET reports within 10 kms listing. */
router.get('/:lat/:long', jwt.valid(), async (req, res) => {
  const { lat, long } = req.params;
  const { filter } = req.query;
  // default filter value
  let filterObj = {
    time: -1
  };
  if (filter) {
    filterObj = filter === 'time' ? { time: -1 } : { coordinates: -1 };
  }
  // The equatorial radius of the Earth is approximately 3,963.2 miles or 6,378.1 kilometers.
  const distance = 10 / 6378.1;
  const reports = await Report.find({
    coordinates: {
      $geoWithin: {
        $centerSphere: [[lat, long], distance],
      },
    },
  }).sort(filterObj);
  return res.send(reports);
});

/* POST a new report */
router.post('/', jwt.valid(), (req, res, next) => {
  const { title, time, coordinates } = req.body;
  Report.create({ title, time, coordinates })
    .then(report => res.send(report))
    .catch((err) => {
      next(err);
    });
});

export default router;
