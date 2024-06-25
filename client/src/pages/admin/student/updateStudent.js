import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateStudent = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");
  const [photo, setphoto] = useState("");
  const navigate=useNavigate();
  const getData = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/student/get-single-student/${params.id}`);
    if (data) {
      let student = data?.user;
      setName(student.name);
      setAddress(student.address);
      setPhone(student.phone);
      setFatherName(student.fatherName);
      setAge(student.age);
      setGrade(student.grade);
      setRollNumber(student.rollNumber);
      setFee(student.fee);
      setphoto(student.photo);
    }
  };

  const submitBtn=async(e)=>{
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
          
          
          const { data } = await axios.post(`http://localhost:5000/api/v1/student/updateStudent/${params.id}`, studentData)
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
                <h4 className="text-center mb-3">Enter Detail To Add a Student</h4>
                <form>
                  <div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Student full Name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Father Name"
                        required
                        value={fatherName}
                        onChange={(e) => {
                          setFatherName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter age"
                        required
                        value={age}
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Phone no"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Class"
                        required
                        value={grade}
                        onChange={(e) => {
                          setGrade(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter RollNumber"
                        required
                        value={rollNumber}
                        onChange={(e) => {
                          setRollNumber(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter fee "
                        required
                        value={fee}
                        onChange={(e) => {
                          setFee(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        required
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      {photo?
                       (
                        <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt="photo" className="img img-responsive" height={"200px"} />
                      </div>
                      ):
                      (
                        <div className="text-center">
                          <img src={`http://localhost:5000/api/v1/student/get-student-photo/${params.id}`} alt="photo" className="img img-responsive" height={"200px"} />
                        </div>
                        
                      )
                      }
                    </div>
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-mb-12">
                        {photo ? photo.name : "Change photo"}
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

                    <button className="btn btn-primary" onClick={submitBtn}>Update</button>
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

export default UpdateStudent;
