import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useNavigate } from "react-router-dom";
const AddTeacher = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name,phone,gender,address,idCard,photo,qualifications,salary,subject,bankDetail,experience)
    try {
     if(name && phone && gender && address && idCard && photo && qualifications && salary && subject && bankDetail && experience){
      const teacherData = new FormData();
      teacherData.append("name", name);
      teacherData.append("phone", phone);
      teacherData.append("gender", gender);
      teacherData.append("address", address);
      teacherData.append("idCard", idCard);
      teacherData.append("photo", photo);
      teacherData.append("qualifications", qualifications);
      teacherData.append("salary", salary);
      teacherData.append("subject",subject );
      teacherData.append("bankDetail", bankDetail);
      teacherData.append("experience", experience);

      const {data}=await axios.post('http://localhost:5000/api/v1/teacher/addTeacher',teacherData)
      if(data?.success){
       navigate('/admin/dashboard/teacher-detail')
      }
      setTimeout(() => {
        toast.success('Teacher Added successFully')
      }, 100);
     }else{
      toast.error('Please Enter complete Detail')
     }
    } catch (error) {
      console.log(error);
      toast.error("something wents wrong in adding product");
    }
  };

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
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
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
                      <select id="genderSelect" value={gender} onChange={(e)=>{setgender(e.target.value)}}>
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
                        onChange={(e) => {
                          setsubject(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
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
                        placeholder="Enter Experience"
                        onChange={(e) => {
                          setexperience(e.target.value);
                        }}
                        required
                      />
                    </div>
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
                    <div className="mb-3">
                      {photo && (
                        <div className="text-center">
                          <img src={URL.createObjectURL(photo)} alt="photo" className="img img-responsive" height={"200px"} />
                        </div>
                      )}
                    </div>
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
                    <div className="mb-3">
                      {idCard && (
                        <div className="text-center">
                          <img src={URL.createObjectURL(idCard)} alt="idCard" className="img img-responsive" height={"200px"} />
                        </div>
                      )}
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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

export default AddTeacher;
