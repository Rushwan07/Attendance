import React, { useState } from "react";
import Presenty from "../components/Presenty";
import { useAuthContext } from "../hooks/useAuthContext";

const Check = () => {
  const {user} = useAuthContext()
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false); 

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/students/` + date, {
        headers: {
          accept: "application/json",
          "User-agent": "learning app",
          'Authorization': `Bearer ${user.token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
      setDataFetched(true); 
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

  return (
    <div>
      <div className="container w-50">
        <div>
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
            <span className="input-group-text">
              <i className="bi bi-calendar"></i>
            </span>
          </div>
          <button
            className="mx-3 btn btn-primary"
            onClick={handleFetchStudents}
          >
            Fetch Students
          </button>
        </div>
        {date && (
          <div>
            <b>Date</b>: {date}
          </div>
        )}
      </div>

      {error && <p>{error}</p>}
      {dataFetched && ( 
        <ul>
          {students && students.length > 0 ? (
            students.map((student) => (
              <Presenty key={student._id} student={student} />
            ))
          ) : (
            <div className="text-center">
              <b>Data not found</b>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Check;
