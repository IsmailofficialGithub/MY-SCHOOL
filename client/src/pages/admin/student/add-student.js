import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useNavigate } from "react-router-dom";
const AddStudent = () => {
  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");
  const [photo, setphoto] = useState("");

  const handleSubmit = async (e) => {
e.preventDefault();
try {
  const studentData = new FormData()
  studentData.append("name", name);
  studentData.append("fatherName", fatherName);
  studentData.append("rollNumber", rollNumber);
  studentData.append("age", age);
  studentData.append("grade", grade);
  studentData.append("address", address);
  studentData.append("fee", fee);
  studentData.append("photo", photo);
  studentData.append("phone", phone);
  
  
  const { data } = await axios.post('http://localhost:5000/api/v1/student/add-student', studentData)
  if (data?.success) {
     navigate('/admin/dashboard/Student-detail')
    
   setTimeout(()=>{
    toast.success('Data added SuccessFully')
   },100)
    
    
  } else {
    toast.error('someThing wents wrong')
  }

    } catch (error) {
      console.log(error)
      toast.error('something wents wrong in adding product');
    }


  }

  return (
    <Layout>
      <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <AdminSide/>
          </div>

          <div className="col-8">
          <div className="container mt-3 w-75">
        <h4 className="text-center mb-3">Enter Detail To Add a Student</h4>
        <form>
          <div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Student full Name"
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
                className="form-control"
                placeholder="Enter Father Name"
                value={fatherName}
                onChange={(e) => {
                  setFatherName(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Phone no"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Class"
                value={grade}
                onChange={(e) => {
                  setGrade(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter RollNumber"
                value={rollNumber}
                onChange={(e) => {
                  setRollNumber(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter fee "
                value={fee}
                onChange={(e) => {
                  setFee(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
            <label className="btn btn-outline-secondary col-mb-12">
                  {photo ? photo.name : 'Upload photo'}
                  <input type="file"
                    name="photo"
                    accept="images/*"
                    onChange={(e) => { setphoto(e.target.files[0]) }}
                    hidden>
                  </input>
                </label>
            </div>
            <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)}
                      alt="photo"
                      className="img img-responsive"
                      height={'200px'}
                    />

                  </div>
                )}
              </div>

            <button  className="btn btn-primary" onClick={handleSubmit}>
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

export default AddStudent;
