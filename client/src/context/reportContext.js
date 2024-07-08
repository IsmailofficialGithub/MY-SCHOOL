import React, {  createContext, useEffect, useState } from "react";
import axios from "axios";

// create a context
const ReportContext = createContext();

//create a provider component
const ReportProvider = ({ children }) => {
  const [ReportDetail, setReportLength] = useState([]);

 
  const reportdetail=async()=>{
    try {
      const {data}=await axios.get('http://localhost:5000/api/v1/report/getAllReports')
      if(data?.success){
        setReportLength(data?.data)
      }
    } catch (error) {
      console.log(error)
      
    }
  }


  useEffect(() => {
    reportdetail();
  }, []);

  return <ReportContext.Provider value={ReportDetail}>{children}</ReportContext.Provider>;
};

export { ReportContext, ReportProvider };
