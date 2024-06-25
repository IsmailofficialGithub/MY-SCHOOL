import React from 'react'
import AdminSide from '../components/adminSide'
import Layout from '../components/Layout'

const AdminDashboard = () => {
  return (
    <Layout>
    
     <div className='row'>
      <div className='col-md-3 '>
        <AdminSide/>
      </div>
      <div className='col-md-9 admin-right'>
        <div className='main-admin'>

        <div className='admin-box text-center' style={{background:'pink'}} >
          <h5>Student </h5>
          <p>Total : 399</p>
        </div>
        <div className='admin-box' style={{background:'orange'}} >hllo</div>
        <div className='admin-box' style={{background:'yellow'}} >hllo</div>
        <div className='admin-box' style={{background:'red'}} >hllo</div>
        </div>
      </div>
      </div>
    
   
      
      </Layout>
  )
}

export default AdminDashboard