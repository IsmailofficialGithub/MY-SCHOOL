import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd';
import Layout from './components/Layout'
import axios from 'axios';
import { Link } from 'react-router-dom';
const NoticeBoard = () => {
  const [notice, setNotice] = useState([]);

  const onChangeDate = (date, dateString) => {
    console.log(dateString);
  };

  const getNotice = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/notice/getNotice`);
      if (data?.success) {
        setNotice(data?.notice);
      }
    } catch (error) {
      console.log(error)


    }
  }
  useEffect(() => {
    getNotice();
  }, [])
  return (

    <Layout>
      <>
        <div className='text-center m-3'>
          <h4>Hello and Wellcome to MY SCHOOl</h4>
        </div>
        <div className='row'>
          <div className='col-md-3 text-center'>
            <h3>filter by date</h3>
            <DatePicker onChange={onChangeDate} needConfirm style={{ cursor: "pointer" }} />
          </div>
          <div className='col-md-9 mb-5'>
            <div className='noticeCard' style={{ padding: "10px" }}>



              {
                notice.length > 0 ?
                  <>
                    {notice?.map((e) => (
                      <div className="card" style={{ width: '17rem', height: "30rem" }} key={e._id}>
                        <div style={{ height: "250px" }} className='img-div '>
                          <img src={`${process.env.REACT_APP_API_URL}/api/v1/notice/get-photo/${e._id}`} className="card-img-top" alt="No Images is Add By Admin" height='100%' />
                        </div>
                        <div style={{ height: "30px", marginTop: "10px", marginLeft: "15px" }}>
                          <h5 className="card-title">{e.title}</h5>
                        </div>
                        <div style={{ height: "110px", marginTop: "4px", marginLeft: "15px" }}>
                          <p className="card-text" height="100%">{e.description.split(" ").slice(0, 13).join(" ")}...</p>
                        </div>
                        <div style={{ height: "40px", marginTop: "4px", marginLeft: "15px" }}>
                          <Link to={`/notice-board-Detail/${e._id}`} className="btn btn-primary mb-2">More Detail</Link>
                        </div>
                        <div style={{ height: "20px", marginTop: "4px", marginLeft: "15px" }}>
                          <p>{e.created_at.split('T')[0]}</p>
                        </div>

                      </div>


                    ))}
                  </>
                  :
                  <h1>No Notice is Added by admin</h1>
              }
              {/* 

<div className="card-body"  style={{textTransform:'capitalize'}}>
  <h5 className="card-title">{e.title}</h5>
  <p className="card-text" style={{height:"130px"}}>{e.description.split(" ").slice(0, 13).join(" ")}...</p>
  <Link to={`/notice-board-Detail/${e._id}`} className="btn btn-primary mb-2">More Detail</Link>
  <p>{e.created_at.split('T')[0]}</p>
</div> */}

            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default NoticeBoard