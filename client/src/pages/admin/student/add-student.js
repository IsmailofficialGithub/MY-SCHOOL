import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import AdminSide from "../../components/adminSide";
import { useNavigate } from "react-router-dom";
import cryptoRandomString from "crypto-random-string";
const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");
  const [photo, setphoto] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = new FormData();
      studentData.append("name", name);
      studentData.append("fatherName", fatherName);
      studentData.append("rollNumber", rollNumber);
      studentData.append("age", age);
      studentData.append("grade", grade);
      studentData.append("address", address);
      studentData.append("fee", fee);
      studentData.append("photo", photo);
      studentData.append("phone", phone);
      studentData.append("userId", userId);
      studentData.append("password", password);
      studentData.append("answer", answer);

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/student/add-student`, studentData);
      if (data?.success) {
        navigate("/admin/dashboard/Student-detail");

        setTimeout(() => {
          toast.success("Data added SuccessFully");
        }, 100);
      } else {
        toast.error("someThing wents wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something wents wrong in adding product");
    }
  };

  // generating user Id randomly;
  const generateUserId = (value) => {
    const randomNumber1 = Math.floor(Math.random() * 10000);
    const randomNumber2 = Math.floor(Math.random() * 10000);
    let formattedValue = value.replace(/\s+/g, '-');
    let uId = `${formattedValue}-${(randomNumber1, randomNumber2)}@mySchool.com`;
    setUserId(uId);
  };

  // generating Random password
  const generatingPassword = () => {
    const randomPassword = cryptoRandomString({ length: 10, type: "alphanumeric" });
    setPassword(randomPassword);
  };

  // handle copy button for userId

  const handleCopyClickUserId = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(userId)
      .then(() => {
        toast.success("userId copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy:", err);
      });
  };
  // handle copy button for password

  const handleCopyClickPassword = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success("password copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy:", err);
      });
  };

  useEffect(() => {
    generatingPassword();
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
                <h4 className="text-center mb-3">Enter Detail To Add a Student</h4>
                <form>
                  <div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Student full Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          generateUserId(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Father Name"
                        value={fatherName}
                        onChange={(e) => {
                          setFatherName(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Phone no"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Class"
                        value={grade}
                        onChange={(e) => {
                          setGrade(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter RollNumber"
                        value={rollNumber}
                        onChange={(e) => {
                          setRollNumber(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter fee "
                        value={fee}
                        onChange={(e) => {
                          setFee(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Last name of Your Father</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add Any Answer for Recovery of Password"
                        value={answer}
                        onChange={(e) => {
                          setAnswer(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <label> UserId</label>
                    <div className="mb-3">
                      <input type="text" disabled="true" value={userId} className="form-control" placeholder="UserId" />
                      <button
                        className="small-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          generateUserId(name);
                        }}>
                        {" "}
                        regenerate
                      </button>
                      <button className="small-btn bg-green" onClick={handleCopyClickUserId}>
                        {" "}
                        copy
                      </button>
                    </div>
                    <label> Password</label>
                    <div className="mb-3">
                      <input type="text" value={password} disabled="true" className="form-control" placeholder="Password" />
                      <button
                        className="small-btn "
                        onClick={(e) => {
                          e.preventDefault();
                          generatingPassword();
                        }}>
                        regenerate
                      </button>
                      <button className="small-btn bg-green" onClick={handleCopyClickPassword}>
                        copy
                      </button>
                    </div>
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-mb-12">
                        {photo ? photo.name : "Upload photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="images/*"
                          onChange={(e) => {
                            setphoto(e.target.files[0]);
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
        </div>
      </>
    </Layout>
  );
};

export default AddStudent;
