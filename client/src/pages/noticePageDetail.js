import React, { useState ,useEffect} from "react";
import toast from "react-hot-toast";
import Layout from "./components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const NoticePageDetail = () => {
  const params = useParams();
  const [noticeDetail,setNoticeDetail]=useState([])
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
              <img src={`http://localhost:5000/api/v1/notice/get-photo/${params.id}`} className="figure-img img-fluid rounded" alt="No Photo is Add" style={{ height: "55vh", width: "55vh", objectFit: "cover" }} />
              <figcaption className="figure-caption text-end">{} Report detail</figcaption>
            </figure>
            <button>Back</button>
          </div>
          <div className="col-md-7">
               
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticePageDetail;
