import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherFullDetail = () => {
  const [teacherDetail, setTeacherDetail] = useState([]);
  const [privateInfo, setPrivateInfo] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getDetail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/teacher/singleTeacher/${params.id}`);
      if (data?.success) {
        setTeacherDetail(data?.data);
      }
    } catch (error) {
      if (error) {
        toast.error("error");
        window.location.reload();
      }
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-3">{teacherDetail.name}</h1>
        <div className="row">
          <div className="col-md-4 m-5">
            <figure className="figure">
              <img src={`http://localhost:5000/api/v1/teacher/teacherPhoto/${params.id}`} className="figure-img img-fluid rounded" alt="..." style={{ height: "45vh", width: "45vh", objectFit: "cover" }} />
              <figcaption className="figure-caption text-end">{teacherDetail.name} picture</figcaption>
            </figure>
            <button
              onClick={() => {
                navigate("/admin/dashboard/teacher-detail");
              }}>
              {" "}
              Back
            </button>
          </div>
          <div className="col-md-6 mt-5">
            <h3>My School</h3>
            <hr />
            <h6>Name : {teacherDetail.name}</h6>
            <h6>Gender : {teacherDetail.gender}</h6>
            <h6>Phone : {teacherDetail.phone}</h6>
            <h6>Address : {teacherDetail.address}</h6>
            <h6>Qualifications : {teacherDetail.qualifications}</h6>
            <h6>Salary : {teacherDetail.salary}</h6>
            <h6>Subject : {teacherDetail.subject}</h6>
            <h6>Experience : {teacherDetail.experience}</h6>
            <h6>Joining : {teacherDetail.created_at}</h6>
            <h4 className="mb-4">ID Card</h4>
            <figure className="figure text-center ">
              <img src={`http://localhost:5000/api/v1/teacher/teacherIdCard/${params.id}`} className="figure-img img-fluid rounded" alt="..." style={{ height: "45vh", width: "45vh", objectFit: "cover" }} />
              <figcaption className="figure-caption text-end">{teacherDetail.name} picture</figcaption>
            </figure>
            {!privateInfo ? "" : 
            <>
                <h6>UserId  :  {teacherDetail.userId}</h6>
              <h6>Password  :  {teacherDetail.password}</h6>
              <h6>Reset Password Answer  :  {teacherDetail.answer}</h6>
            </>
            }
            <button className="btn btn-danger" onClick={() => setPrivateInfo((prevPrivateInfo) => !prevPrivateInfo)}>
              {!privateInfo ? "Private Info" : "Hide Private Info"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherFullDetail;
