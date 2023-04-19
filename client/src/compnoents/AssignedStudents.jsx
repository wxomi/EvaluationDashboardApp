import React, { useState, useEffect } from "react";
import EditMarksModal from "./EditMarksModal";
import axios from "axios";

const AssignedStudents = (props) => {
  const updateComponent = () => {
    axios
      .get(`http://localhost:3001/api/v1/mentor/${props.mentor}/students/all`)
      .then((response) => {
        setAssignedStudents(
          response.data.data.filter((item) => {
            return item.Score != null;
          })
        );
      });
  };

  useEffect(() => {
    props.setSelected("ass");
    updateComponent();
  }, []);

  function lockAll(){
    axios.post(`http://localhost:3001/api/v1/mentor/${props.mentor}/lock`).then((response)=>{

    })
  }

  const [assignedStudents, setAssignedStudents] = useState([]);

  const [currentStudent, setCurrentStudent] = useState({
    studdentId: null,
    mentorId: null,
  });

  const [modalOpened, setModalOpened] = useState(false);

  const closeModal = () => {
    setModalOpened(false);
  };
  // console.log(assignedStudents);

  const studentCards = assignedStudents.map((item) => {
    console.log(item);
    return (
      <>
        <div
          className="student-card"
          onClick={() => {
            setModalOpened(true);
            setCurrentStudent({ studdentId: item.id, mentorId: item.mentorId });
          }}
        >
          <div className="card-top">{item.name} {item.id}</div>
          <div className="card-bottom">
            <div>IdeationScore: {item.Score.IdeationScore}</div>
            <div>ExecutionScore: {item.Score.ExecutionScore}</div>
            <div>VivaPatchScore: {item.Score.VivaPatchScore}</div>
            <div>Total: {item.Score.total}</div>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="assigned-stu-con">
      {modalOpened && (
        <EditMarksModal
          closeModal={closeModal}
          studentId={currentStudent.studdentId}
          mentorId={currentStudent.mentorId}
          updateComponent={updateComponent}
          post = {false}
        />
      )}
      {studentCards}
      <button className="mentor-sel-button submit-all" onClick={lockAll}>Submit All</button>
    </div>
  );
};

export default AssignedStudents;
