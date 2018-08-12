import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import Admin from '../models/admin';

const router = express.Router();

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);

/* GET home page. */
router.post('/', (req, res, next) => {
  Admin.findOne({ email: req.body.email }).then((admin) => {
    if (bcrypt.compareSync(req.body.password, admin.password)) {
      const jwt = res.jwt({
        email: admin.email,
        id: admin.id
      });
      res.send({ token: jwt.token });
    } else {
      res.status(401).send({ error: 'Invalid Credentials' });
    }
  }).catch(err => next(err));
});

export default router;
