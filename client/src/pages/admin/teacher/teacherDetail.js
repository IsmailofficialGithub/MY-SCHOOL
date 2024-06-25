import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TeacherDetail = () => {
  const [teacher, setTeacher] = useState([]);
  const navigate = useNavigate();
  const fetchTeacher = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/teacher/allTeacher");
      if (data?.teachers) {
        let user = data?.teachers;
        setTeacher(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  const sumbitDelete = async (pId) => {
    let result = prompt(`please type "delete" to delete student`);
    if (result === "delete") {
      try {
        const { data } = await axios.delete(`http://localhost:5000/api/v1/teacher/deleteTeacher/${pId}`);
        if (data?.success) {
          toast.success("deleted product successfully");
          fetchTeacher();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("invalid output");
    }
  };
  return (
    <Layout>
      <>
        <div className="container">
          <div className="row">
            <div className="col-4 ">
              <AdminSide />
            </div>
            <div className="col-8 mt-4 mb-3">
              <h6 className="text-center mb-3">Total Teacher : {teacher.length}</h6>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {teacher?.map((e, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img src={`http://localhost:5000/api/v1/teacher/teacherPhoto/${e._id}`} alt={`Student ${e.name}`} width={"50px"} height={"50px"} style={{ objectFit: "fill" }} />
                      </td>
                      <td>{e.name}</td>
                      <td>{e.subject}</td>
                      <td>{e.gender}</td>
                      <td>
                        <div
                          className="btn btn-secondary m-1"
                          onClick={() => {
                            navigate(`/admin/dashboard/teacher-Full-Detail/${e._id}`);
                          }}>
                          Details
                        </div>
                        <div
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/admin/dashboard/update-teacher/${e._id}`);
                          }}>
                          Update
                        </div>
                        <div
                          className="btn btn-danger m-1"
                          onClick={() => {
                            sumbitDelete(e._id);
                          }}>
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default TeacherDetail;
