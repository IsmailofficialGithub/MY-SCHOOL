import React ,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TeacherPrivate = () => {
     const navigate=useNavigate()
     const [isTeacher,setIsTeacher]=useState(false);
     useEffect(()=>{
     const teacher=JSON.parse(localStorage.getItem('auth'));
     if(teacher?.user?.role === 2){
          setIsTeacher(true);
     }else{
          setIsTeacher(false);
          navigate('/');
         setTimeout(()=>{
             toast.error('Your are not Teacher')
         },100)
     }
     

     },[])
     

  return (
    <>
     {!isTeacher?"": <Outlet/>}
    </>
  )
}

export default TeacherPrivate