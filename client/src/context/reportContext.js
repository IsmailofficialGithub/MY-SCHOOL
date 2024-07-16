import React, {  createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// create a context
const ReportContext = createContext();

//create a provider component
const ReportProvider = ({ children }) => {
  const [isReportAvaliable, setIsReportAvaliable] = useState('');
  const studentId=JSON.parse(localStorage.getItem('auth'))
  let id=studentId.user._id;

 
  const reportdetail=async()=>{
    try {
      const {data}=await axios.put('http://localhost:5000/api/v1/report/isReportAvaliable',{studentId:id})
      if(data?.success){
        setIsReportAvaliable(data?.message)
        
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
