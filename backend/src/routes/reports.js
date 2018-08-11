import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Report from '../models/report';

dotenv.config();

const router = express.Router();
const { DB_HOST, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`);

/* GET reports within 10 kms listing. */
/**
   * @param {number} lat - this is a value.
   * @param {number} long - this is a value.
   * @return {[reports]} result of the reports within 10 kms.
   */
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

/**
 * this is Reports Controller.
 */
export default router;
