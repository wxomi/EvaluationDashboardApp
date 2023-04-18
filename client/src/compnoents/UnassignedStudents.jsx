import React, { useState, useEffect } from "react";
import EditMarksModal from "./EditMarksModal";
import axios from "axios";

const UnassignedStudents = () => {
  const updateComponent = () => {
    axios
      .get(`http://localhost:3000/api/v1/mentor/2/students/all`)
      .then((response) => {
        setUnssignedStudents(
          response.data.data.filter((item) => {
            return item.Score == null;
          })
        );
      });
  };

  useEffect(() => {
    updateComponent();
  }, []);

  const [unassignedStudents, setUnssignedStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    studdentId: null,
    mentorId: null,
  });

  const [modalOpened, setModalOpened] = useState(false);

  const closeModal = () => {
    setModalOpened(false);
  };
  // console.log(assignedStudents);

  const studentCards = unassignedStudents.map((item) => {
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

export default UnassignedStudents;
