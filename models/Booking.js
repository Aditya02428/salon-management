const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
bookingSchema.index({ date: 1, timeSlot: 1 });
bookingSchema.index({ user: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
