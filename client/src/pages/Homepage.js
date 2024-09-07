import React ,{useEffect,useState}from "react";
import Layout from "./components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
const [noticeDetial,setNoticeDetail]=useState([])

const gettingNotice=async()=>{
  try {
  const {data}=await axios.get('http://localhost:5000/api/v1/notice/getNotice')
  if(data.success){
    setNoticeDetail(data?.notice);
  }
    
  } catch (error) {
    console.log(error)
    
  }
}
useEffect(()=>{
  gettingNotice()
},[])
  return (
    <Layout>
      <>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/1.jpg"  alt="college" style={{height:'70vh',width:'100%',objectFit:'cover'}}/>
              <div className="carousel-caption d-none d-md-block " style={{ color: "red" }}>
                <h1>MY SCHOOL</h1>
                <h3 className="bold">Some representative placeholder content for the first slide.</h3>
                <br />
                <br />

                <br />
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/schoolok.jpg" className="d-block w-100" alt="..." style={{height:'70vh',width:'100%',objectFit:'cover'}}/>
              <div className="carousel-caption d-none d-md-block">
                <h3>Second slide label</h3>
                <h5>Some representative placeholder content for the second slide.</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/collage3.jpeg" className="d-block w-100" alt="..." style={{height:'70vh',width:'100%',objectFit:'cover'}}/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <hr />

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-7 ">
              <h1>About us</h1>
              <p className="mt-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker includes.</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker includes.</p>
              <button
                style={{ width: "80px", fontSize: "11px" }}
                onClick={() => {
                  navigate("/about");
                }}>
                {" "}
                Read More
              </button>
            </div>
            <div className="col-md-5 mb-3  align">
              <img src="/images/school.jpeg" alt="My school" width="100%" />
            </div>
          </div>
        </div>
        <hr />

        <div className="container">
          <h1 className="text-center mb-5">Admissions</h1>
          <div className="row mb-5">
            <div className="col-md-4 admission-main">
              <div className="home-admission-box text">
                <h1>
                  🏸
                  <br />
                  Admissions
                </h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
              </div>
            </div>
            <div className="col-md-4  admission-main">
              <div className="home-admission-box" style={{ background: "rgb(0, 169, 141)" }}>
                <h1>
                  🏫
                  <br />
                  Acadimics
                </h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
              </div>
            </div>
            <div className="col-md-4  admission-main">
              <div className="home-admission-box">
                <h1>
                  📰
                  <br />
                  Examination
                </h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
              </div>
            </div>
          </div>
        </div>

      {noticeDetial.length > 0 ? 
      <>
        <h1 className="text-center mt-5 ">Events And Notices</h1>
        <div className="events-home mb-5">
                {noticeDetial.map((e,index)=>(
                 <div className="event-home-inner">
                <div style={{height:"100%",marginBottom:"13px"}} className="img-div">
                   <img src={`http://localhost:5000/api/v1/notice/get-photo/${e._id}`} alt="My school" width="100%" />
                  </div>
                 <h3>{e.title}</h3>
                 <p>{e.description.split('').slice(0, 60).join('')}...</p>
                 <span onClick={()=>{navigate(`/notice-board-Detail/${e._id}`)}}>Read More</span>
               </div>
                ))}
        </div>
      </>
      :
      ''}
      </>
    </Layout>
  );
};

export default HomePage;
