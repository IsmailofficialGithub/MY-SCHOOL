import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ReportFullDetailForTeacher = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [reportDetail, setReportDetail] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/report/getReport/${params.id}`);
      if (data?.success) {
        setReportDetail(data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something Wents wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-3">Report</h1>
        <div className="row">
          <div className="col-md-4 m-5">
            <figure className="figure">
              <img src={`${process.env.REACT_APP_API_URL}/api/v1/report/gettingPhoto/${params.id}`} className="figure-img img-fluid rounded" alt="No Photo is Add" style={{ height: "45vh", width: "45vh", objectFit: "cover" }} />
              <figcaption className="figure-caption text-end">{} Report detail</figcaption>
            </figure>
            <Link to={`http://localhost:3000/teacher/dashboard/report/${params.id}`}><button>Back</button></Link>
          </div>
          <div className="col-md-6 mt-5">
            <h3>My School</h3>
            <hr />
            <h6>Condition  : {reportDetail.condition}<hr/></h6>
           <h6>Complain  : <br/> {reportDetail.complain}<hr/></h6>
           <h6>Message  :  <br/>{reportDetail.message}<hr/></h6>
           <h6>Notification  :  <br/>{reportDetail.notification}<hr/></h6>
           <h6>Add on  :  <br/>{reportDetail.createdAt}<hr/></h6>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportFullDetailForTeacher;
