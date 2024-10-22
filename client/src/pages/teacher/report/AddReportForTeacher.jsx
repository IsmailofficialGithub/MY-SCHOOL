import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddReportForTeacher = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [condition, setCondition] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [complain, setComplain] = useState("");
  const [notification, setNotification] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const id = params.id;
      const sumbitData = new FormData();
      sumbitData.append("studentId", id);
      sumbitData.append("condition", condition);
      sumbitData.append("message", message);
      sumbitData.append("complain", complain);
      sumbitData.append("notification", notification);
      sumbitData.append("photo", photo);

      const { data } = await axios.post("https://my-school-backend.onrender.com/api/v1/report/addReport", sumbitData);
      if (data?.success) {
        navigate(`/teacher/dashboard/report/${id}`);
        setTimeout(() => {
          toast.success('Report is add Successfully')
        }, 100);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error ");
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-3 w-75">
              <h4 className="text-center mb-3">Enter Detail To report a Student</h4>
              <form>
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <span>Select Student Condition</span>
                      <select
                        onChange={(e) => {
                          setCondition(e.target.value);
                        }}>
                        <option value={"Excelent"}>Excelent</option>
                        <option value={"Good"}>Good</option>
                        <option value={"Average"}>Average</option>
                        <option value={"Bad"}>Bad</option>
                        <option value={"Worst"}>Worst</option>
                      </select>
                    </label>
                  </div>

                  <div className="mb-3">
                    <div className="mb-3">
                      <textarea
                        cols="10"
                        rows="6"
                        placeholder="Enter complain"
                        type="text"
                        className="form-control"
                        value={complain}
                        onChange={(e) => {
                          setComplain(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Notification"
                        value={notification}
                        onChange={(e) => {
                          setNotification(e.target.value);
                        }}
                      />
                    </div>
                  </div>

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
                        <img src={URL.createObjectURL(photo)} className="img img-responsive" height={"200px"} alt="photo"/>
                      </div>
                    )}
                  </div>

                  <button className="btn btn-primary" onClick={handleSumbit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddReportForTeacher;
