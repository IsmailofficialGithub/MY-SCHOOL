import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NoticeDetailFull = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [noticeDetail, setNoticeDetail] = useState({});
  const getNotice = async () => {
    try {
      const { data } = await axios.get(`https://my-school-backend.onrender.com/api/v1/notice/getSingleNotice/${params.id}`);
      if (data?.success) {
        setNoticeDetail(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotice();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-3">{noticeDetail.title}</h1>
        <div className="row">
          <div className="col-md-4 m-5">
            <figure className="figure">
              <img src={`https://my-school-backend.onrender.com/api/v1/notice/get-photo/${params.id}`} className="figure-img img-fluid rounded" alt="..." style={{ height: '45vh', width: '45vh', objectFit: 'cover' }} />
              <figcaption className="figure-caption text-end">{noticeDetail.title} picture</figcaption>
            </figure>
            <button
              onClick={() => {
                navigate("/admin/dashboard/notice-detail");
              }}>
              {" "}
              Back
            </button>
          </div>
          <div className="col-md-6 mt-5">
            <h3>My School</h3>
            <hr />
            <h6>Name  :  {noticeDetail.title}</h6>
            <h6>Category  :  {noticeDetail.catagory}</h6>
            <h6>Valid for  :  {noticeDetail.date != 1 ? noticeDetail.date : 'Unlimited'}</h6>
            <h6>Description  :<br /> <br />  {(noticeDetail.description)}</h6>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticeDetailFull;
