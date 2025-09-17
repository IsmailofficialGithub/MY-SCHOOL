import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateReport = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [condition, setCondition] = useState("");
  const [complain, setComplain] = useState("");
  const [notification, setNotification] = useState("");
  const [photo, setPhoto] = useState("");

  const getValue = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/report/getReport/${params.id}`);
      if (data?.success) {
        setMessage(data?.data.message);
        setCondition(data?.data?.condition);
        setNotification(data?.data?.notification);
        setComplain(data?.data?.complain);
      }
    } catch (error) {
      console.log(error);
    }


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append('message', message)
      updateData.append('photo', photo)
      updateData.append('condition', condition)
      updateData.append('complain', complain)
      updateData.append('notification', notification)

      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/report/updateReport/${params.id}`, updateData)
      if (data?.success) {
        toast.success('Updated report SuccessFully');
      }


    } catch (error) {
      console.log(error)
      toast.error('error while updating')


    }

  }
  useEffect(() => {
    getValue();
  }, []);


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
                <h4 className="text-center mb-3">Enter Detail To Update a Report</h4>
                <form>
                  <div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Reports Title"
                        required
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
                          value={condition}
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

                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center">
                          <img src={URL.createObjectURL(photo)} alt="photo" className="img img-responsive" height={"200px"} />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img src={`${process.env.REACT_APP_API_URL}/api/v1/report/gettingPhoto/${params.id}`} alt="NO PHOTO IS ADDED WHILE CREATING" className="img img-responsive" height={"200px"} />
                        </div>
                      )}
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

                    <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default UpdateReport;
