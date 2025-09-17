import React, { Children, createContext, useEffect, useState } from "react";
import axios from "axios";

// create a context
const StudentContext = createContext();

//create a provider component
const StudentProvider = ({ children }) => {
  const [studentDetail, setStudentDetail] = useState([]);

  const fetchStudent = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/student/getAllStudent`);
      if (data?.students) {
        let user = data?.students;
        setStudentDetail(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return <StudentContext.Provider value={studentDetail}>{children}</StudentContext.Provider>;
};

export { StudentContext, StudentProvider };
