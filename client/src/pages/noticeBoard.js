import React, { useState,useEffect } from 'react'
import Layout from './components/Layout'
import axios from 'axios';
import { Link } from 'react-router-dom';
const NoticeBoard = () => {
  const [notice,setNotice]=useState([]);

  const getNotice=async()=>{
    try {
      const {data}=await axios.get('http://localhost:5000/api/v1/notice/getNotice');
      if(data?.success){
       setNotice(data?.notice);
      }
    } catch (error) {
      console.log(error)
      window.location.reload()

      
    }
  }
useEffect(()=>{
  getNotice();
},[])
  return (
    
    <Layout>
     <>
     <div className='text-center m-3'>
      <h4>Hello and Wellcome to MY SCHOOl</h4>
     </div>
     <div className='row'>
      <div className='col-md-4'></div>
      <div className='col-md-8 mb-5'>
        <div className='noticeCard'>
      


       {notice?.map((e)=>(
           <div className="card" style={{width: '15rem'}} key={e._id}>
           <img src ={`http://localhost:5000/api/v1/notice/get-photo/${e._id}`} className="card-img-top" alt="..."/>
           <div className="card-body"  style={{textTransform:'capitalize'}}>
             <h5 className="card-title">{e.title}</h5>
             <p className="card-text">{e.description.split(" ").slice(0, 13).join(" ")}...</p>
             <Link to={`/notice-board-Detail/${e._id}`} className="btn btn-primary mb-2">More Detail</Link>
             <p>{e.created_at.split('T')[0]}</p>
           </div>
         </div>
       
         
       ))}

        </div>
      </div>
     </div>
      </>
    </Layout>
  )
}

export default NoticeBoard