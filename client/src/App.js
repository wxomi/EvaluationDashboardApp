import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./global.css";
import Homepage from "./compnoents/Homepage";
import AssignMarks from "./compnoents/AssignMarks";
import AllStudents from "./compnoents/AllStudents";
import AssignedStudents from "./compnoents/AssignedStudents";
import UnassignedStudents from "./compnoents/UnassignedStudents";
import { useEffect, useState } from "react";
import StudentAssign from "./compnoents/StudentAssign";
import axios from "axios";

function App() {
  const [mentor, setMentor] = useState(null);
  const [selected, setSelected] = useState("all");
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/mentor/${mentor}/students/all`)
      .then((response) => {
        setAllStudents(response.data.data);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={<Homepage mentor={mentor} setMentor={setMentor} />}
        >
          <Route index element={<Navigate to="marks-assign" />} />
          <Route
            path="student-assign"
            element={
              <StudentAssign
                setSelected={setSelected}
                mentor={mentor}
                setMentor={setMentor}
                allStudents={allStudents}
                setAllStudents={setAllStudents}
              />
            }
          />
          <Route
            path="marks-assign"
            element={<AssignMarks selected={selected} />}
          >
            <Route
              index
              element={
                <AssignedStudents setSelected={setSelected} mentor={mentor} />
              }
            />
            <Route
              path="all-students"
              element={
                <AllStudents
                  setSelected={setSelected}
                  mentor={mentor}
                  allStudents={allStudents}
                  setAllStudents={setAllStudents}
                />
              }
            />
            <Route
              path="assigned-students"
              element={
                <AssignedStudents setSelected={setSelected} mentor={mentor} />
              }
            />
            <Route
              path="unassigned-students"
              element={
                <UnassignedStudents setSelected={setSelected} mentor={mentor} />
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
