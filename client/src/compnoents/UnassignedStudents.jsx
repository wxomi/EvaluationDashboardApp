import React, { useState, useEffect } from "react";
import EditMarksModal from "./EditMarksModal";
import axios from "axios";

const UnassignedStudents = (props) => {
  const updateComponent = () => {
    axios
      .get(`http://localhost:3001/api/v1/mentor/${props.mentor}/students/all`)
      .then((response) => {
        setUnssignedStudents(
          response.data.data.filter((item) => {
            return item.Score == null;
          })
        );
      });
  };

  useEffect(() => {
    props.setSelected("uns");
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
          <div className="card-top">Assign a score</div>
          <div className="card-bottom card-bottom-uns">
            <div className="card-top-uns">{item.name} {item.id}</div>
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
          post = {true}
        />
      )}
      {studentCards}
    </div>
  );
};

export default UnassignedStudents;
