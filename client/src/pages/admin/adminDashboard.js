import React, { useEffect, useState } from "react";
import AdminSide from "../components/adminSide";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [allLength, setAllLength] = useState([]);
  const navigate = useNavigate();
  const getAllModel = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/adminAll`);
      if (data.message === "successFully getting all lengths") {
        setAllLength(data?.length);
        console.log(data?.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllModel();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3 ">
          <AdminSide />
        </div>
        <div className="col-md-9 admin-right">
          <div className="main-admin  text-center">
            <div
              className="admin-box"
              style={{ background: "pink" }}
              onClick={() => {
                navigate("/admin/dashboard/Student-detail");
              }}>
              <h5>Student </h5>
              <h4>Total : {allLength.studentLength}</h4>
            </div>

            <div
              className="admin-box"
              style={{ background: "#BCA0BC" }}
              onClick={() => {
                navigate("/admin/dashboard/userInfo");
              }}>
              <h5>Users </h5>
              <h4>Total : {allLength.userLength}</h4>
            </div>

            <div
              className="admin-box"
              style={{ background: "#B7D3F2" }}
              onClick={() => {
                navigate("/admin/dashboard/teacher-detail");
              }}>
              <h5>Teacher </h5>
              <h4>Total : {allLength.teacherLength}</h4>
            </div>

            <div
              className="admin-box"
              style={{ background: "#F9B9F2" }}
              onClick={() => {
                navigate("/admin/dashboard/Student-detail");
              }}>
              <h5>Reports </h5>
              <h4>Total : {allLength.reportLength}</h4>
            </div>

            <div
              className="admin-box"
              style={{ background: "#8A84E2" }}
              onClick={() => {
                navigate("/admin/dashboard/notice-detail");
              }}>
              <h5>Notices </h5>
              <h4>Total : {allLength.noticeLength}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
