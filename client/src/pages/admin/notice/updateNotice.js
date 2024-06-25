import React, { useState } from 'react'
import Layout from '../../components/Layout'
import AdminSide from '../../components/adminSide'
import { useParams } from 'react-router-dom'

const UpdateNotice = () => {
     const params=useParams()
     const [title,setTitle]=useState('')
     const [description,setDescription]=useState('')
     const [date,setDate]=useState('')
     const [catagory,setCatagory]=useState('')
     const [photo,setPhoto]=useState('')
  return (
     <Layout>
     <>
       <div className="container">
         <div className="row">
           <div className="col-4">
             <AdminSide />
           </div>

           <div className="col-8">
             <div className="container mt-3 w-75">
               <h4 className="text-center mb-3">Enter Detail To Add a Student</h4>
               <form>
                 <div>
                   <div className="mb-3">
                     <input
                       type="text"
                       className="form-control"
                       placeholder="Enter Title"
                       required
                       value={title}
                       onChange={(e) => {
                         setTitle(e.target.value);
                       }}
                     />
                   </div>
                   <div className="mb-3">
                     <input
                       type="text"
                       className="form-control"
                       placeholder="Enter description"
                       required
                       value={description}
                       onChange={(e) => {
                         setDescription(e.target.value);
                       }}
                     />
                   </div>
                   <div className="mb-3">
                     <input
                       type="number"
                       className="form-control"
                       placeholder="Enter catagory"
                       required
                       value={catagory}
                       onChange={(e) => {
                         setCatagory(e.target.value);
                       }}
                     />
                   </div>
                   <div className="mb-3">
                     <input
                       type="number"
                       className="form-control"
                       placeholder="Enter Phone no"
                       required
                       value={date}
                       onChange={(e) => {
                         setDate(e.target.value);
                       }}
                     />
                   </div>
                 
                   
                   <div className="mb-3">
                     {photo?
                      (
                       <div className="text-center">
                       <img src={URL.createObjectURL(photo)} alt="photo" className="img img-responsive" height={"200px"} />
                     </div>
                     ):
                     (
                       <div className="text-center">
                         <img src={`http://localhost:5000/api/v1/notice/get-photo/${params.id}`} alt="photo" className="img img-responsive" height={"200px"} />
                       </div>
                       
                     )
                     }
                   </div>
                   <div className="mb-3">
                     <label className="btn btn-outline-secondary col-mb-12">
                       {photo ? photo.name : "Change photo"}
                       <input
                         type="file"
                         name="photo"
                         accept="images/*"
                         onChange={(e) => {
                           setPhoto(e.target.files[0]);
                         }}
                         hidden></input>
                     </label>
                   </div>

                   <button className="btn btn-primary">Update</button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
     </>
   </Layout>
  )
}

export default UpdateNotice