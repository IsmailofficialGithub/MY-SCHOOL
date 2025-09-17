import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateTeacher = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [idCard, setidCard] = useState("");
  const [photo, setphoto] = useState("");
  const [qualifications, setqualifications] = useState("");
  const [salary, setsalary] = useState("");
  const [subject, setsubject] = useState("");
  const [bankDetail, setbankDetail] = useState("");
  const [experience, setexperience] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/teacher/singleTeacher/${params.id}`);
    if (data?.success) {
      setName(data?.data.name);
      setexperience(data?.data.experience);
      setsubject(data?.data.subject)
      setgender(data?.data.gender)
      setsalary(data?.data.salary)
      setbankDetail(data?.data.bankDetail)
      setqualifications(data?.data.qualifications)
      setaddress(data?.data.address)
      setphone(data?.data.phone)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teacherDetail = new FormData();
      teacherDetail.append("name", name);
      teacherDetail.append("experience", experience);
      teacherDetail.append("gender", gender);
      teacherDetail.append("bankDetail", bankDetail);
      teacherDetail.append("qualifications", qualifications);
      teacherDetail.append("address", address);
      teacherDetail.append("salary", salary);
      teacherDetail.append("photo", photo);
      teacherDetail.append("idCard", idCard);
      teacherDetail.append("subject", subject);
      teacherDetail.append("phone", phone);

      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/teacher/updateTeacher/${params.id}`, teacherDetail);
      if (data?.success) {
        navigate("/admin/dashboard/teacher-detail");
        setTimeout(() => {
          toast.success("Data updated SuccessFully");
        }, 100);
      } else {
        toast.error("someThing wents wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something wents wrong in adding product");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <AdminSide />
            </div>

            <div className="col-8">
              <div className="container mt-3 w-75">
                <h4 className="text-center mb-3">Enter Detail To Add a Teacher</h4>
                <form>
                  <div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter full Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={phone}
                        className="form-control"
                        placeholder="Enter Phone"
                        onChange={(e) => {
                          setphone(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Select Gender </label>
                      <select
                        id="genderSelect"
                        value={gender}
                        onChange={(e) => {
                          setgender(e.target.value);
                        }}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={qualifications}
                        placeholder="Enter Qualifications"
                        onChange={(e) => {
                          setqualifications(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={salary}
                        placeholder="Enter Salary"
                        onChange={(e) => {
                          setsalary(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Subject "
                        value={subject}
                        onChange={(e) => {
                          setsubject(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={bankDetail}
                        className="form-control"
                        placeholder="Enter BankDetails"
                        onChange={(e) => {
                          setbankDetail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={experience}
                        placeholder="Enter Experience"
                        onChange={(e) => {
                          setexperience(e.target.value);
                        }}
                        required
                      />
                    </div>
                    {/* photo */}
                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center">
                          <img src={URL.createObjectURL(photo)} alt="photo" className="img img-responsive" height={"200px"} />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img src={`${process.env.REACT_APP_API_URL}/api/v1/teacher/teacherPhoto/${params.id}`} alt="photo" className="img img-responsive" height={"200px"} />
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="btn btn-outline-secondary col-mb-12">
                          {photo ? photo.name : "Upload photo"}
                          <input
                            type="file"
                            name="photo"
                            accept="images/*"
                            onChange={(e) => {
                              setphoto(e.target.files[0]);
                            }}
                            hidden></input>
                        </label>
                      </div>
                    </div>
                    {/* photo */}

                    {/* idcard*/}
                    {idCard ? (
                      <div className="text-center">
                        <img src={URL.createObjectURL(idCard)} alt="photo" className="img img-responsive" height={"200px"} width={"200px"} style={{ objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div className="mb-3">
                        <div className="text-center">
                          <img src={`${process.env.REACT_APP_API_URL}/api/v1/teacher/teacherIdCard/${params.id}`} alt="idCard" className="img img-responsive" height={"200px"} />
                        </div>
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-mb-12">
                        {idCard ? idCard.name : "Upload idCard"}
                        <input
                          type="file"
                          name="idCard"
                          accept="images/*"
                          onChange={(e) => {
                            setidCard(e.target.files[0]);
                          }}
                          hidden></input>
                      </label>
                    </div>
                    {/* idcard*/}

                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default UpdateTeacher;
