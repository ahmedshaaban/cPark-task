const mongoose = require('mongoose');

const Report = mongoose.model('Report',
  {
    title: String,
    time: { type: Date, default: Date.now },
    position: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  });

module.exports = Report;
