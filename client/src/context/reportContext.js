import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// create a context
const ReportContext = createContext();

//create a provider component
const ReportProvider = ({ children }) => {
  const [isReportAvaliable, setIsReportAvaliable] = useState('');



  const reportdetail = async () => {
    try {
      const studentId = JSON.parse(localStorage.getItem('auth'))
      let id = studentId?.user?._id;
      if (id) {

        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/report/isReportAvaliable`, { studentId: id })
        if (data?.success) {
          setIsReportAvaliable(data?.message)

        }
      }
    } catch (error) {
      console.log(error)

    }
  }


  useEffect(() => {
    reportdetail();
  }, []);

  return <ReportContext.Provider value={isReportAvaliable}>{children}</ReportContext.Provider>;
};

export { ReportContext, ReportProvider };
