import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Addstudent = () => {
  const [name, setName] = useState("");
  const [clas, setClas] = useState("");
  const [roll, setRoll] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in')
      return
    }
    const student = { name, clas, roll };
    try {
      const response = await fetch("/api/students/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(student),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      setName("");
      setClas("");
      setRoll("");
      setError(null);
      setSuccessMessage("Student added successfully!");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <form className="container w-50 mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control"
            aria-describedby="nameHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Class
          </label>
          <input
            type="text"
            onChange={(e) => setClas(e.target.value)}
            value={clas}
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Roll number
          </label>
          <input
            onChange={(e) => setRoll(e.target.value)}
            value={roll}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success text-center">{successMessage}</div>}
      </form>
    </div>
  );
};

export default Addstudent;
