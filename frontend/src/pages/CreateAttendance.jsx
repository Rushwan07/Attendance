import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateAttendance = () => {
  
  const {user} = useAuthContext()
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancemsg, setAttendancemsg] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/students/`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Error fetching students. Please try again.");
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFetchStudents = () => {
    fetchStudents();
  };

  const handleAttendanceChange = (studentId, present) => {
    const updatedAttendance = attendanceData.slice();
    const index = updatedAttendance.findIndex(
      (item) => item.studentId === studentId
    );
    if (index !== -1) {
      updatedAttendance[index].present = present;
    } else {
      updatedAttendance.push({ studentId, present });
    }
    setAttendanceData(updatedAttendance);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/students/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ date, attendance: attendanceData }),
        
      });
      if (!response.ok) {
        throw new Error("Failed to submit attendance");
      }

      setAttendancemsg("Attendance submitted successfully");
      setDate("");
      setStudents([]);
      setAttendanceData([]);
      setError(null);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setError("Error submitting attendance. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="container w-50">
        <label htmlFor="dateInput" className="form-label">
          Select Date:
        </label>
        <div className="input-group mb-3">
          <input
            type="date"
            id="dateInput"
            className="form-control"
            onChange={handleDateChange}
            value={date}
            aria-describedby="dateHelp"
          />
          <span className="input-group-text" id="dateHelp">
            <i className="bi bi-calendar"></i>
          </span>
        </div>
        <button
          className="mx-3 btn - btn-primary"
          onClick={handleFetchStudents}
        >
          Fetch Students
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-success">{attendancemsg}</h2>
      </div>
      {students &&
        students.map((student) => (
          <div
            key={student._id}
            className="container p-4 rounded d-flex justify-content-between bg-light text-dark mt-3"
          >
            <div style={{ width: "80vh" }}>
              <b>{student.name} </b>
            </div>
            <div style={{ width: "30vh" }}>
              <b>{student.clas}</b>
            </div>
            <div style={{ width: "20vh" }}>
              <b>{student.roll}</b>
            </div>
            <div style={{ width: "10vh" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`present-${student._id}`}
                  onChange={(e) =>
                    handleAttendanceChange(student._id, e.target.checked)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`present-${student._id}`}
                >
                  <b>Present</b>
                </label>
              </div>
            </div>
          </div>
        ))}

      <div className="text-center mt-3 p-4">
        {date && (
          <button className="btn btn-success w-50" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateAttendance;