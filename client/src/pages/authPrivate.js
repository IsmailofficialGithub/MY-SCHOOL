import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const AuthPrivate = () => {
     const navigate = useNavigate();
     const [isLogin, setisLogin] = useState(false);

     useEffect(() => {
          const user = JSON.parse(localStorage.getItem("auth"));
          if (user) {
               setisLogin(true);
               navigate('/');
               setTimeout(() => {
                    toast.error('You are Already login . Please logout first to visit this page')
               }, 100)

          } else {
               setisLogin(false);
          }
     }, [isLogin]);
     return (
          <>
               {isLogin ? '' : <Outlet />}
          </>
     )
}

export default AuthPrivate