import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'
const ReportOption = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [exist, setExist] = useState("");
  // const context=ReportContext()
  const submitDelete = async (e) => {
    e.preventDefault();
    let deleteValue = window.prompt('Type "Delete" to delete report')
    if (deleteValue === 'Delete') {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/report/deleteReport/${params.id}`)
      if (data?.success) {
        toast.success('Delete Report successFully');
        setExist('ok');
      }
    } else {
      toast.error('invalid Input')
    }

  }

  const checking = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/report/checkingAvalible/${params.id}`);
      if (data?.success) {
        setExist("ok");
      } else {
        setExist("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checking();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <AdminSide />
          </div>
          <div className="col-md-8 select-report">
            {exist !== "ok" ? (
              <>
                <button className="btn btn-secondary" onClick={() => { navigate(`/admin/dashboard/FullReportDetail/${params.id}`) }}>Report Detail</button>
                <button onClick={() => { navigate(`/admin/dashboard/update-report/${params.id}`) }}>Report Update</button>
                <button className="btn btn-danger" onClick={submitDelete}>Report Delete</button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/admin/dashboard/add-student-report/${params.id}`);
                }}>
                ADD Report
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportOption;
