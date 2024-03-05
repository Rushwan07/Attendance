const mongoose = require('mongoose')
const Student = require('../models/studentModel')


const getStudents = async (req, res) => {
  const user_id = req.user._id
  const students = await Student.find({ user_id }).sort({ createdAt: 1 })

  res.status(200).json(students)
}

const createStudents = async (req, res) => {
  const { name, clas, roll } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!clas) {
    emptyFields.push('clas');
  }
  if (!roll) {
    emptyFields.push('roll');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const user_id = req.user._id
    const student = await Student.create({ name, clas, roll, user_id });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getStudent = async (req, res) => {
  try {
    const { date } = req.params;
    const user_id = req.user._id
    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const startDate = new Date(formattedDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(formattedDate);
    endDate.setHours(23, 59, 59, 999);

    const presentStudents = await Student.find({
      user_id,
      'attendance.date': { $gte: startDate, $lte: endDate },
      'attendance.isPresent': true
    }).select('name clas roll');
    res.status(200).json(presentStudents);
  } catch (error) {
    console.error('Error fetching present students:', error);
    res.status(500).json({ error: 'Server error' });
  }
}


const deleteStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such student' })
  }

  const student = await Student.findOneAndDelete({ _id: id })

  if (!student) {
    return res.status(400).json({ error: 'No such student' })
  }

  res.status(200).json(student)
}

const createAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    if (!Array.isArray(attendance)) {
      return res.status(400).json({ error: 'Attendance data must be an array' });
    }

    for (const { studentId, present } of attendance) {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        console.error(`Invalid student ID: ${studentId}`);
        continue;
      }

      const student = await Student.findById(studentId);
      if (!student) {
        console.error(`Student not found with ID: ${studentId}`);
        continue;
      }

      const existingAttendanceIndex = student.attendance.findIndex(record => record.date === date);
      if (existingAttendanceIndex !== -1) {
        console.error(`Attendance record already exists for student with ID ${studentId} on date ${date}`);
        return res.status(400).json({ error: `Attendance record already exists for student with ID ${studentId} on date ${date}` });
      }

      const attendanceRecord = {
        date,
        isPresent: present
      };

      student.attendance.push(attendanceRecord);
      await student.save();
    }

    res.status(200).json({ message: 'Attendance submitted successfully' });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getStudents,
  createStudents,
  deleteStudent,
  getStudent,
  createAttendance

}