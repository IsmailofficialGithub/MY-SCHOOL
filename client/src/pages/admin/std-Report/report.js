import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminSide from '../../components/adminSide'
import { useNavigate ,useParams} from 'react-router-dom'
import axios from 'axios'


const ReportOption = () => {
     const navigate=useNavigate();
     const params=useParams();
     const [exist,setExist]=useState('');

     const checking=async()=>{
          try {
               const {data}=await axios.get(`http://localhost:5000/api/v1/report/checkingAvilability/${params.id}`)
               if(data?.success){
                  setExist('ok')  ;
               }else{
                    setExist('')
               }
          } catch (error) {
               console.log(error)
               
          }

     }
     useEffect(()=>{
          checking();
          console.log(exist)
     },[])
  return (
    <Layout>
     <div className='container'>
          <div className='row'>
               <div className='col-md-4'>
                    <AdminSide/>
               </div>
               <div className='col-md-8 select-report'>
                    {exist !='ok' ?'Report Already Add ':(
                    <button className='btn btn-primary' onClick={()=>{navigate(`/admin/dashboard/add-student-report/${params.id}`)}}>ADD Report</button>

                    )}
                    <button className='btn btn-secondary'>Report Detail</button>
                    <button >Report Update</button>
               </div>
          </div>
     </div>
    </Layout>
  )
}

export default ReportOption