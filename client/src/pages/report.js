import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const Report = () => {
  const params=useParams();
  const [imgSrc,setImgSrc]=useState(`http://localhost:5000/api/v1/report/gettingPhoto/${params.id}`)
  const [reportData,setReportData]=useState([]);
  const altSrc=`/images/logo__2_-removebg-preview.png`

  const onImgError=()=>{
    setImgSrc(altSrc)
  }

  const gettingData=async()=>{
    try {
      const {data}=await axios.get(`http://localhost:5000/api/v1/report/getReport/${params.id}`)
      if(data?.success){
        setReportData(data?.data)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('someThing is went wrong');
      
    }
  }
  useEffect(()=>{
    gettingData();
  },[])
  return (
    <Layout>
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-md-4'>
          <figure className="figure">
              <img src={imgSrc} className="figure-img img-fluid rounded" alt="No Photo is Add" style={{ height: "45vh", width: "45vh", objectFit: "cover" }} onError={onImgError}/>
              <figcaption className="figure-caption text-end">{} Report detail</figcaption>
            </figure>
          </div>
          <div className='col-md-8'>
            <h3>
              Report Are here
            </h3>
            <div className='after-heading-report-js'>
                <div className='after-heading-report-js-1'>

                </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Report;