const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  relationshipStatus: {
    type: String,
    enum: ['Single', 'In a Relationship', 'Married', 'Complicated', 'Prefer not to say'],
    required: true,
  },
  // Extra questions if they are single
  extraAnswers: {
    lookingFor: String, // What are you looking for?
    idealDate: String,  // Ideal date idea?
    hobbies: String,    // Hobbies/Interests
    whyMessage: String, // Why did you decide to message me?
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
