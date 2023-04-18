import React, { useState, useEffect } from "react";
import axios from "axios";

const AllStudents = () => {
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/mentor/2/students/all`)
      .then((response) => {
        setAllStudents(response.data.data);
      });
  }, []);

  const [allStudents, setAllStudents] = useState([]);

  return (
    <div className="all-student-con">
      {allStudents.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
};

export default AllStudents;
