const mongoose = require('mongoose');

const parkingAssignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
    required: true
  },
  slotId: {
    type: String,
    required: true,
    trim: true
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  releasedAt: {
    type: Date
  }
}, {
  timestamps: true
});

parkingAssignmentSchema.index({ userId: 1, releasedAt: 1 });
parkingAssignmentSchema.index({ slotId: 1, releasedAt: 1 });

module.exports = mongoose.model('ParkingAssignment', parkingAssignmentSchema);