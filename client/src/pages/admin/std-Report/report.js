import React from 'react'
import Layout from '../../components/Layout'
import AdminSide from '../../components/adminSide'
import { useNavigate } from 'react-router-dom'

const ReportOption = () => {
     const navigate=useNavigate();
  return (
    <Layout>
     <div className='container'>
          <div className='row'>
               <div className='col-md-4'>
                    <AdminSide/>
               </div>
               <div className='col-md-8 select-report'>
                    <button className='btn btn-primary' onClick={()=>{navigate('/admin/dashboard/add-student-report')}}>ADD Report</button>
                    <button className='btn btn-secondary'>Report Detail</button>
                    <button >Report Update</button>
               </div>
          </div>
     </div>
    </Layout>
  )
}

export default ReportOption