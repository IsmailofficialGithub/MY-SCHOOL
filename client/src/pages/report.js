import React, { useContext, useEffect, useState } from "react";
import Layout from "./components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ReportContext } from "../context/reportContext";

const Report = () => {
  const params = useParams();
  const [imgSrc, setImgSrc] = useState(`https://my-school-backend.onrender.com/api/v1/report/gettingPhoto/${params.id}`);
  const [reportData, setReportData] = useState([]);
  const [isReport, setIsReport] = useState(false);
  const reportAvaliable = useContext(ReportContext)
  const apiId = JSON.parse(localStorage.getItem("auth")).user?.studentUserId;
  const altSrc = `/images/school.jpeg`;

  const onImgError = () => {
    setImgSrc(altSrc);
  };

  const gettingData = async () => {
    try {
      const { data } = await axios.get(`https://my-school-backend.onrender.com/api/v1/report/getReport/${apiId}`);
      if (data?.message === "SuccessFully getting report") {
        setReportData(data?.data);
        setIsReport(true);
      } else {
        setIsReport(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettingData();
  }, []);
  return (
    <Layout>
      <div className="container-sm mt-3">
        <div className="row">
          <div className="col-md-4">
            <figure className="figure mt-5">
              <img src={imgSrc} className="figure-img img-fluid rounded" alt="No Photo is Add" style={{ height: "60vh", width: "60vh", objectFit: "cover" }} onError={onImgError} />
              <figcaption className="figure-caption text-end">{ } Report detail</figcaption>
            </figure>
          </div>
          <div className="col-md-8">
            {!isReport ? (
              <div className="d-flex justify-content-center align-items-center flex-column mt-4">
                <h1>Report is Not Add Now </h1>
                <p>Your Report is added Very Soon</p>
                <p>Thanks For Visiting !!!</p>
              </div>
            ) : (
              <>
                <h3>Report Are here</h3>
                <div className="after-heading-report-js">
                  <div className="after-heading-report-js-1 p-5">
                    {reportData ? (
                      <h5>
                        <span className="fw-bolder">Condition</span> : {reportData.condition}
                      </h5>
                    ) : (
                      "FINE"
                    )}
                    <hr />
                    {reportData ? (
                      <h5>
                        <span className="fw-bolder">Message</span> : <br /> <br />
                        {reportData.message}
                      </h5>
                    ) : (
                      "NO MESSAGE"
                    )}
                    <hr />
                    {reportData ? (
                      <h5>
                        <span className="fw-bolder">Notification</span> :<br /> <br /> {reportData.notification}
                      </h5>
                    ) : (
                      "NO NOTIFICATION"
                    )}
                    <hr />
                    {reportData ? (
                      <h5>
                        <span className="fw-bolder">Complain</span> : <br /> <br />
                        {reportData.complain}
                      </h5>
                    ) : (
                      "NO COMPLAIN"
                    )}
                    <hr />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
