const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  savedCareers: [{
    careerId: String,
    careerTitle: String,
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  quizResults: [{
    answers: Array,
    recommendations: Array,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  skillAssessments: [{
    skillRatings: Object,
    strongSkills: Array,
    weakSkills: Array,
    recommendedCareers: Array,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  profile: {
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    occupation: { type: String, default: '' },
    education: { type: String, default: '' },
    bio: { type: String, default: '' },
    skills: [String],
    interests: [String],
    photo: { type: String, default: '' },
    stats: {
      careersExplored: { type: Number, default: 0 },
      quizzesCompleted: { type: Number, default: 0 },
      skillsAnalyzed: { type: Number, default: 0 }
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
