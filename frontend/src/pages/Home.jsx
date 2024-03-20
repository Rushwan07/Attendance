import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const {user} = useAuthContext()
  const [students, setStudents] = useState([]);
  const [delstudent, setDelstudent] = useState("");
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students", {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        setStudents(json);
      }
    };

    fetchStudents();
  }, []);

  const handleClick = async (id) => {
    console.log(id)
    const response = await fetch("/api/students/" + id, {
      method: "DELETE",
      headers: {'Authorization': `Bearer ${user.token}`},
    });
    const json = await response.json();
    if (response.ok) {
      setDelstudent("Student deleted successfully");
    }
  };
  return (
    <div>
      <div className="">
      {students.length === 0 && (
        <div className="text-center mt-5">
          <h1 >No students added yet.</h1>
          <small>To check the students, First you need to add the students from the add student page.</small>
        </div>
      )}
        <div className="text-center">{delstudent}</div>
        {students &&
          students.map((student) => (
            <div className="container p-4 rounded d-flex justify-content-between bg-light text-dark mt-3">
              <div style={{ width: "80vh" }}>
                <b>{student.name} </b>
              </div>
              <div style={{ width: "30vh" }}>
                <b>{student.clas}</b>
              </div>
              <div style={{ width: "20vh" }}>
                <b>{student.roll}</b>
              </div>

              <button
                onClick={() => handleClick(student._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;