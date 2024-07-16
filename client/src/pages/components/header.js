import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ReportContext } from "../../context/reportContext";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Badge } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const [istoken, setIsToken] = useState(false);
  const [role, setRole] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [userId, setUserId] = useState("");
  const reportAvaliable = useContext(ReportContext);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    setTimeout(() => {
      toast.success("Logout Successfully");
    }, 100);
  };
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("auth"));
    setUserId(admin?.user?._id);
    if (admin?.user?.role === 3) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, []);
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("auth"));
    if (localUser?.user?.role === 0 || localUser?.user?.role === 1) {
      setRole(false);
    } else {
      setRole(true);
    }
  }, []);
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("auth"));
    if (student?.user?.role === 1) {
      setIsStudent(true);
    } else {
      setIsStudent(false);
    }
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black d-flex text-white  ">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand text-white" to={"/"}>
              MY SCHOOL
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              {istoken && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active text-white" aria-current="page" to={"/notice-board"}>
                      Notice Board
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to={"/about"}>
                      About us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to={"/contact"}>
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to={"/qna"}>
                      Qna
                    </Link>
                  </li>
                  {isStudent ? (
                    <>
                      {reportAvaliable === "report is available for this user" ? (
                        <Badge
                          count={
                            <ClockCircleOutlined
                              style={{
                                color: "#f5222d",
                                marginTop: "5px",
                              }}
                            />
                          }>
                          <li className="nav-item">
                            <Link className="nav-link text-white" to={`/student/report/${userId}`}>
                              <p style={{ fontSize: "19px" }}>Report</p>
                            </Link>
                          </li>
                        </Badge>
                      ) : (
                        <Link className="nav-link text-white" to={`/student/report/${userId}`}>
                          <p>Report</p>
                        </Link>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {role ? (
                    <li className="nav-item">
                      <Link className="nav-link text-white" to={`/${admin ? "admin" : "teacher"}/dashboard`}>
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li className="nav-item" onClick={handleLogout}>
                    <Link className="nav-link text-white" to={""}>
                      LogOut
                    </Link>
                  </li>
                </>
              )}

              {!istoken && (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link text-white" to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to={"/register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
