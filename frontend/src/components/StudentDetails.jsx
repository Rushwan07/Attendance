import React from "react";

const studentDetails = () => {
  return (
    <div className="">
      <div className="container p-4 rounded d-flex justify-content-between bg-light text-dark mt-3">
        <div style={{ width: "80vh" }}>
          <b>sayyed rushwan ali naved ali </b>
        </div>
        <div style={{ width: "30vh" }}>
          <b>12th A</b>
        </div>
        <div style={{ width: "20vh" }}>
          <b>1</b>
        </div>
        <div style={{ width: "10vh" }}>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              <b>Present</b>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default studentDetails;
