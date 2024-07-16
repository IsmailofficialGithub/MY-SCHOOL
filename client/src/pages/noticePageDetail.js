import React, { useState ,useEffect} from "react";
import toast from "react-hot-toast";
import Layout from "./components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const NoticePageDetail = () => {
  const params = useParams();
  const [noticeDetail,setNoticeDetail]=useState([])
  const [photoUrl,setPhotoUrl]=useState(`http://localhost:5000/api/v1/notice/get-photo/${params.id}`)
  const imgError=()=>{
    setPhotoUrl('/images/school.jpeg')
  }
  const getData=async()=>{
     try {
          const {data}=await axios.get(`http://localhost:5000/api/v1/notice/getSingleNotice/${params.id}`)
          if(data?.success){
               setNoticeDetail(data?.data)
          }
     } catch (error) {
          console.log(error)
          toast.error('someThing wents wrong')
          getData()
     }
  }
  useEffect(()=>{
     getData()
  },[5])
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <figure className="figure">
              <img src={photoUrl} className="figure-img img-fluid rounded" alt="No Photo is Add" style={{ height: "55vh", width: "55vh", objectFit: "cover" }} onError={imgError}/>
              <figcaption className="figure-caption text-end">{} Report detail</figcaption>
            </figure>
            <Link to={'/notice-board'}><button>Back</button></Link>
          </div>
          <div className="col-md-7" style={{textTransform:"capitalize"}}>
                <h1 style={{borderBottom:"2px solid black",textAlign:"center"}}>{noticeDetail.title}</h1>
                <h3>Description :</h3>
                <p>{noticeDetail.description} </p>
                
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticePageDetail;
