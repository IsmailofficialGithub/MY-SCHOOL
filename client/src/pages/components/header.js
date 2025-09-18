import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ReportContext } from "../../context/reportContext";
import { ClockCircleOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import "../../css/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const reportAvailable = useContext(ReportContext);

  // Handle nav collapse
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // Single useEffect to handle all user data
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setUserData(authData.user);
      setIsToken(true);
    } else {
      setUserData(null);
      setIsToken(false);
    }
  }, []);

  // Use useMemo for derived values to avoid recalculating
  const { isAdmin, isStudent, hasDashboard } = useMemo(() => {
    if (!userData) return { isAdmin: false, isStudent: false, hasDashboard: false };
    
    return {
      isAdmin: userData.role === 3,
      isStudent: userData.role === 1,
      hasDashboard: userData.role > 1 // Assuming roles 2 and 3 have dashboards
    };
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/auth/login");
    setTimeout(() => {
      toast.success("Logout Successfully");
    }, 100);
  };

  return (
    <header className="custom-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="brand-text">MY SCHOOL</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded={!isNavCollapsed ? true : false} 
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <MenuOutlined />
          </button>
          
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setIsNavCollapsed(true)}>
                  Home
                </Link>
              </li>
              
              {isToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/notice-board" onClick={() => setIsNavCollapsed(true)}>
                      Notice Board
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about" onClick={() => setIsNavCollapsed(true)}>
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact" onClick={() => setIsNavCollapsed(true)}>
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/qna" onClick={() => setIsNavCollapsed(true)}>
                      Q&A
                    </Link>
                  </li>
                  
                  {isStudent && (
                    <li className="nav-item">
                      {reportAvailable === "report is available for this user" ? (
                        <Badge
                          count={
                            <ClockCircleOutlined
                              style={{
                                color: "#fff",
                                backgroundColor: "#ff4d4f",
                                borderRadius: "50%",
                                fontSize: "10px",
                                width: "16px",
                                height: "16px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            />
                          }
                        >
                          <Link className="nav-link" to={`/student/report/${userData?._id}`} onClick={() => setIsNavCollapsed(true)}>
                            Report
                          </Link>
                        </Badge>
                      ) : (
                        <Link className="nav-link" to={`/student/report/${userData?._id}`} onClick={() => setIsNavCollapsed(true)}>
                          Report
                        </Link>
                      )}
                    </li>
                  )}
                  
                  {hasDashboard && (
                    <li className="nav-item">
                      <Link className="nav-link dashboard-link" to={`/${isAdmin ? "admin" : "teacher"}/dashboard`} onClick={() => setIsNavCollapsed(true)}>
                        Dashboard
                      </Link>
                    </li>
                  )}
                  
                  <li className="nav-item">
                    <button className="nav-link logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/login" onClick={() => setIsNavCollapsed(true)}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/register" onClick={() => setIsNavCollapsed(true)}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
            
            {isToken && userData && (
              <div className="user-info">
                <UserOutlined className="me-2" />
                <span className="welcome-text">Welcome, {userData.name}</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;