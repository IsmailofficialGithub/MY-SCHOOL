import React ,{useState,useEffect} from "react";
import Layout from "../../components/Layout";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


const StudentFullDetail = () => {
  const params=useParams();
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");

  const getData=async()=>{
    try {
      const  {data}=await axios.get(`http://localhost:5000/api/v1/student/get-single-student/${params.id}`)
      if(data?.success){
       setName(data?.user?.name)
       setAddress(data?.user?.address)
       setPhone(data?.user?.phone)
       setFatherName(data?.user?.fatherName)
       setRollNumber(data?.user?.rollNumber)
       setAge(data?.user?.age)
       setGrade(data?.user?.grade)
       setFee(data?.user?.fee)
      }
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-3">{name}</h1>
        <div className="row">
          <div className="col-md-4 m-5">
            <figure className="figure">
              <img src={`http://localhost:5000/api/v1/student/get-student-photo/${params.id}`} className="figure-img img-fluid rounded" alt="..." style={{height:'45vh',width:'45vh',objectFit:'cover'}}/>
              <figcaption className="figure-caption text-end">{name} picture</figcaption>
            </figure>
            <button onClick={()=>{navigate('/admin/dashboard/Student-detail')}}> Back</button>
          </div>
          <div className="col-md-6 mt-5">
            <h3>My School</h3>
            <hr />
            <h5>Name  :  {name}</h5>
            <h5>Father  :  {fatherName}</h5>
            <h5>Age  :  {age}</h5>
            <h5>Fee  :  {fee}</h5>
            <h5>Phone  :  {phone}</h5>
            <h5>Class  :  {grade}</h5>
            <h5>RollNumber  :  {rollNumber}</h5>
            <h5>Address  :  {address}</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentFullDetail;
