import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const NoticeDetail = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [photo, setPhoto] = useState("");

  const getNotice = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/notice/getNotice");
      if (data?.success) {
        setNotice(data?.notice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sumbitDelete = async (id) => {
    let prompt = window.prompt('Type "Delete" to delete Notice');
    if (prompt === "Delete") {
      try {
        const { data } = await axios.delete(`http://localhost:5000/api/v1/notice/deleteNotice/${id}`);
        if (data?.success) {
          toast.success("Delete notice successfully");
          getNotice();
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      toast.error('Invalid input')
    }
  };
  useEffect(() => {
    getNotice();
  }, []);

  return (
    <Layout>
      <>
        <div className="row">
          <div className="col-4 ">
            <AdminSide />
          </div>
          <div className="col-8 mt-4 mb-3">
            <h6 className="text-center mb-3">Total Notice : {notice.length}</h6>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">catagory</th>
                  <th scope="col">Valid for</th>
                  <th scope="col">Modify</th>
                </tr>
              </thead>
              <tbody>
                {notice?.map((e, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{e.title}</td>
                    <td>{e.description.split(" ").slice(0, 4).join(" ")}...</td>
                    <td>{e.catagory}</td>
                    <td>{e.date != 1 ? e.date : "Unlimited"}</td>
                    <td>
                      <div
                        className="btn btn-secondary m-1"
                        onClick={() => {
                          navigate(`/admin/dashboard/teacher-Full-Detail/${e._id}`);
                        }}>
                        Details
                      </div>
                      <div
                        className="btn btn-primary"
                        onClick={() => {
                          navigate(`/admin/dashboard/update-notice/${e._id}`);
                        }}>
                        Update
                      </div>
                      <div
                        className="btn btn-danger m-1"
                        onClick={() => {
                          sumbitDelete(e._id);
                        }}>
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default NoticeDetail;
