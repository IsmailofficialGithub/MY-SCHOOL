import React ,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentPrivate = () => {
     const navigate=useNavigate()
     const [isStudent,setIsStudent]=useState(false);
     useEffect(()=>{
     const student=JSON.parse(localStorage.getItem('auth'));
     if(student?.user?.role === 1){
          setIsStudent(true);
     }else{
          setIsStudent(false);
          navigate('/');
         setTimeout(()=>{
             toast.error('Your are not Verified Student')
         },100)
     }
     

     },[])
     

  return (
    <>
     {!isStudent?"": <Outlet/>}
    </>
  )
}

export default StudentPrivate