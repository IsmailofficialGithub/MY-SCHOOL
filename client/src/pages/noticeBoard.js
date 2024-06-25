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
           <div className="card" style={{width: '15rem'}}>
           <img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.cLFYh5JgUcvbxNL4oz9WjAHaGF%26pid%3DApi&sp=1719212197T1442df5ad054077fdf6c16e11b0b65e8aa7e80b717acd77defa54a8c007f44db" className="card-img-top" alt="..." />
           <div className="card-body">
             <h5 className="card-title">{e.title}</h5>
             <p className="card-text">{e.description}</p>
             <Link to={'/'} className="btn btn-primary">More Detail</Link>
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