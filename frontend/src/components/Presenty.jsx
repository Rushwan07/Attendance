import React from "react";

const Presenty = ({ student }) => {
  return (
    <div>

      <div className="">
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
          <div style={{ width: "10vh" }}>
            <div class="form-check">
              <label
                class="form-check-label text-success"
                for="flexCheckDefault"
              >
                <b>Present</b>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presenty;
