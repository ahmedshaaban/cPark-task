import mongoose from 'mongoose';

const Report = mongoose.model('Report',
  {
    title: { type: String, required: true },
    time: { type: Date, default: Date.now },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator(array) {
          return array.every(v => typeof v === 'number') && array.length === 2;
        },
      },
    },
  });

export default Report;
