import React, { useState, useEffect } from "react";
import EditMarksModal from "./EditMarksModal";
import axios from "axios";

const AssignedStudents = () => {
  const updateComponent = () => {
    axios
      .get(`http://localhost:3001/api/v1/mentor/2/students/all`)
      .then((response) => {
        setAssignedStudents(
          response.data.data.filter((item) => {
            return item.Score != null;
          })
        );
      });
  };

  useEffect(() => {
    updateComponent();
  }, []);

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
          <div>{item.name}</div>
          <div>{item.Score.IdeationScore}</div>
          <div>{item.Score.ExecutionScore}</div>
          <div>{item.Score.VivaPatchScore}</div>
          <div>{item.Score.total}</div>
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
        />
      )}
      {studentCards}
    </div>
  );
};

export default AssignedStudents;
