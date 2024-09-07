import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const StudentDetailForTeachers
 = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [privateInfo, setPrivateInfo] = useState(false);
  const [studentDetail, setStudentDetail] = useState([]);
  const altSrc=`/images/empty.jpeg`
  const [imgSrc,setImgSrc]=useState(`http://localhost:5000/api/v1/student/get-student-photo/${params.id}`)

  const onImgError=()=>{
    setImgSrc(altSrc)
  }
  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/forTeachers/studentForTeacher/${params.id}`);
      if (data?.success) {
        setStudentDetail(data?.user)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-3">{studentDetail.name}</h1>
        <div className="row">
          <div className="col-md-4 m-5">
            <figure className="figure">
              <img src={imgSrc} className="figure-img img-fluid rounded" alt="..." style={{ height: "45vh", width: "45vh", objectFit: "cover" }} onError={onImgError} />
              <figcaption className="figure-caption text-end">{studentDetail.name} picture</figcaption>
            </figure>
            <button
              onClick={() => {
                navigate("/teacher/dashboard");
              }}>
              Back
            </button>
          </div>
          <div className="col-md-6 mt-5">
            <h3>My School</h3>
            <hr />
            <h5>Name : {studentDetail.name}</h5>
            <h5>Father : {studentDetail.fatherName}</h5>
            <h5>Age : {studentDetail.age}</h5>
            <h5>Fee : {studentDetail.fee}</h5>
            <h5>Phone : {studentDetail.phone}</h5>
            <h5>Class : {studentDetail.grade}</h5>
            <h5>RollNumber : {studentDetail.rollNumber}</h5>
            <h5>Address : {studentDetail.address}</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDetailForTeachers;
