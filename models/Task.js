const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El títol és obligatori'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  cost: {
    type: Number,
    required: [true, 'El cost és obligatori'],
    min: [0, 'El cost no pot ser negatiu']
  },
  hours_estimated: {
    type: Number,
    required: [true, 'La previsió d’hores és obligatòria'],
    min: [0, 'La previsió d’hores no pot ser negativa']
  },
  hours_real: {
    type: Number,
    min: [0, 'Les hores reals no poden ser negatives']
  },
  image: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  finished_at: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', taskSchema);
