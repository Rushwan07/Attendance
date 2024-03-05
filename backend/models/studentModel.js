const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
  date: {
    type: Date,

  },
  isPresent: {
    type: Boolean,

  }
});

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  clas: {
    type: String,
    required: true
  },
  roll: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  attendance: [attendanceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema)