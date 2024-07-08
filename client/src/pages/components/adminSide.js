import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const AdminSide = () => {
     const navigate=useNavigate();
  return (
    <>
     <div className="container admin-dash-top">
  
    <Link to={'/admin/dashboard/Student-detail'} className="col" >Student Details</Link>
    <Link to={'/admin/dashboard/add-student'} className="col">Add Student</Link>
    <Link to={'/admin/dashboard/teacher-detail'} className="col">Teacher Details</Link>
    <Link to={'/admin/dashboard/add-teacher'} className="col">Add Teacher</Link>
    <Link to={'/admin/dashboard/add-notice'} className="col">Add Notice</Link>
    <Link to={'/admin/dashboard/notice-detail'} className="col">Notice Detail</Link>

    
   
   
</div>

    </>
  )
}

export default AdminSide