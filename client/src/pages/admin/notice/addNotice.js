import React, { useState } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNotice = () => {
  const navigate=useNavigate();
     
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [catagory, setCatagory] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = async (e) => {
       e.preventDefault();
     
    try {

      const noticeData = new FormData();
      noticeData.append("title", title);
      noticeData.append("description", description);
      noticeData.append("catagory", catagory);
      noticeData.append("photo", photo);
      noticeData.append("date", date);
      const {data}=await axios.post('http://localhost:5000/api/v1/notice/addNotice',noticeData)
      if(data?.success){
         navigate('/admin/dashboard/notice-detail')
       setTimeout(() => {
        toast.success('Add Notice SuccessFully')
       }, 100);   
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        <div className="row">
          <div className="col-4 ">
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
                      placeholder="Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category"
                      value={catagory}
                      onChange={(e) => {
                        setCatagory(e.target.value);
                      }}
                      required
                    />
                  </div>
                 <label> Valid For</label>
                 <div className="unlimited-btn" onClick={()=>{setDate(date === '1' ? '' : '1')}}> {date !=1 ? "Unlimited"  :"Set Time" }</div>
                {date != 1 ?  <div className="mb-3">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="date"
                      onChange={(e) => {
                        setDate(e.target.value)
                      }}
                      required
                    />
                    
                  </div>:''}
                 

                  <div className="mb-3">
                    <label className="btn btn-outline-secondary col-mb-12">
                      {photo ? photo.name : "Upload photo"}
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
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt="photo" className="img img-responsive" height={"200px"} />
                      </div>
                    )}
                  </div>

                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AddNotice;
