const express = require('express')
const {getStudents, createStudents, deleteStudent, getStudent, createAttendance } = require('../controllers/studentControllers')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()
router.use(requireAuth)

router.get('/', getStudents)

router.get('/:date', getStudent)

router.post('/', createStudents)

router.post('/attendance', createAttendance)

router.delete('/:id', deleteStudent)

module.exports = router