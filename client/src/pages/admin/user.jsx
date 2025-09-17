import React, { useEffect, useState } from "react";
import AdminSide from "../components/adminSide";
import Layout from "../components/Layout";
import axios from "axios";

const UserPage = () => {
     const [user,setUser]=useState([])

     const getUser=async()=>{
          try {
               const {data}=await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/allUser`)
               if(data?.success){
                    setUser(data?.data)
               }
          } catch (error) {
               console.log(error)
          }
     }
     useEffect(()=>{
          getUser()
     },[])
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-5">
              <AdminSide />
            </div>
            <div className="col-md-7">
              <div className="user-main">
                <div className="d-flex flex-direction-row justifyContentSpaceBetween m-3 ">
                  <h2>All User</h2>
                  <h5>userLength : {user.length}</h5>
                </div>

                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Role</th>
                      <th scope="col">UserId</th>
                      <th scope="col">Backup Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                   {user.map((e,index)=>(
                     <tr>
                     <th scope="row">{index+1}</th>
                     <td>{e.role===3?"Admin":e.role===2?"teacher":e.role===1?"student":"Regular"}</td>
                     <td>{e.userId}</td>
                     <td>{e.answer}</td>
                   </tr>
                   ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserPage;
