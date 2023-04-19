import axios from "axios";
import React, { useState } from "react";

const EditMarksModal = (props) => {
  const [inputVals, setInputVal] = useState({
    eval: null,
    exec: null,
    viva: null,
  });

  const AssignButton = async () => {
    const response = await axios.patch(
      `http://localhost:3001/api/v1/mentor/${props.mentorId}/student/${props.studentId}/score`,
      {
        ideationScore: inputVals.eval,
        executionScore: inputVals.exec,
        vivaPatchScore: inputVals.viva,
      }
    );
    console.log(response);

    props.closeModal();
    props.updateComponent();
  };

  const handleChange = (event) => {
    setInputVal((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  return (
    <div className="EditMarksModal">
      {props.studentId}
      <br />
      {props.mentorId}
      <div className="EditMarksModal-shadow" onClick={props.closeModal}></div>
      <div className="input-card">
        <input
          type="number"
          name="eval"
          placeholder="Type you id here..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="number"
          name="exec"
          placeholder="Type you id here..."
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <input
          type="number"
          name="viva"
          placeholder="Type you id here..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button className="mentor-sel-button" onClick={AssignButton}>
          Assign Marks
        </button>
      </div>
    </div>
  );
};

export default EditMarksModal;
