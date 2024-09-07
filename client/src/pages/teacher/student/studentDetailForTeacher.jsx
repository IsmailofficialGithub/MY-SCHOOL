import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Empty, Modal } from "antd";
import { GoSearch } from "react-icons/go";

const StudentFullDetailforTeacher = () => {
  const searchInput = {};
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [studentDetail, setStudentDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/student/searchStudent", searchInput);
      if (data) {
        toast.success(data?.message);
        setStudentDetail(data?.data);
      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchStudent = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/student/getAllStudent");
      if (data?.students) {
        let user = data?.students;
        setStudentDetail(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filterApi = async (value) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/v1/student/classFilter/${value}`);
      if (data?.students) {
        setStudentDetail(data?.students);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (e) => {
    let value = e.target.value;
    await setFilter(value);
    filterApi(value);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const sumbitDelete = async (pId) => {
    let result = prompt(`please type "delete" to delete student`);
    if (result === "delete") {
      try {
        const { data } = await axios.delete(`http://localhost:5000/api/v1/student/deleteStudent/${pId}`);
        if (data?.success) {
          toast.success("deleted product successfully");
          fetchStudent();
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
            {/* <div className="col-4 ">
              <AdminSide />
            </div> */}


            <div className="col-12 mt-4 mb-3">
              <h6 className="text-center mb-3">Total Student : {studentDetail.length}</h6>
              {/* //filter  */}

              <div className="filter-student-detail">
                <p>Filter By Class</p>
                <select onChange={handleChange}>
                  {[...Array(10)].map((_, i) => (
                    <option value={i + 1} key={i + 1}>
                      {` ${i + 1}`}
                    </option>
                  ))}
                </select>
                <span
                  onClick={() => {
                    window.location.reload();
                  }}>
                  {" "}
                  resetFilter
                </span>
                <p onClick={showModal}>
                  <GoSearch />
                </p>
              </div>
              {/* //filter  */}
              {studentDetail.length < 1 ? <h3 className="text-center mb-3">NO Student Found</h3> : ""}
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">image</th>
                    <th scope="col">Name</th>
                    <th scope="col">fatherName</th>
                    <th scope="col">class</th>
                    <th scope="col">Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetail?.map((e, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img src={`http://localhost:5000/api/v1/student/get-student-photo/${e._id}`} alt={`No Image `} width={"50px"} height={"50px"} style={{ objectFit: "fill" }}/>
                      </td>
                      <td>{e.name}</td>
                      <td>{e.fatherName}</td>
                      <td>{e.grade}</td>
                      <td>
                       
                        <div
                          className="btn btn-secondary m-1"
                          onClick={() => {
                            navigate(`/teacher/dashboard/detail/${e._id}`);
                          }}>
                          Details
                        </div>
                        <div style={{textDecoration:"underLine",color:'blue',cursor:'pointer'}} >
                        < span onClick={()=>{navigate(`/teacher/dashboard/report/${e._id}`)}}>  Report ↗️</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ===search Model */}
        <Modal className="searchModel" title="Search Students" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Atleast one field required</p>

          <br />

          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="exampleInputEmail1"
                value={searchInput.name}
                onChange={(e) => {
                  searchInput.name = e.target.value;
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="FatherName"
                value={searchInput.fatherName}
                onChange={(e) => {
                  searchInput.fatherName = e.target.value;
                }}
              />
            </div>
            <b>class</b>
            <div className="mb-3">
              <select
                onChange={(e) => {
                  searchInput.grade = e.target.value;
                }}>
                {[...Array(10)].map((_, i) => (
                  <option value={i + 1} key={i + 1}>
                    {` ${i + 1}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={searchInput.address}
                onChange={(e) => {
                  searchInput.address = e.target.value;
                }}
              />
            </div>
          </form>
        </Modal>
      </>
    </Layout>
  );
};

export default StudentFullDetailforTeacher;
