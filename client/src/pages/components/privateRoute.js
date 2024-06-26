import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const PrivateRoute = () => {
     const navigate=useNavigate();
     const [admin,setAdmin]=useState(false);

     useEffect(() => {
          const student = JSON.parse(localStorage.getItem("auth"));
          if (student?.user?.role === 0 || student?.user?.role === 1) {
            setAdmin(false);
            navigate('/');
           setTimeout(()=>{
               toast.error('Your are not admin')
           },100)

          } else {
            setAdmin(true);
          }
        }, []);
  return (
     <>
         {!admin ? '' :<Outlet/>}
     </>
  )
}

export default PrivateRoute