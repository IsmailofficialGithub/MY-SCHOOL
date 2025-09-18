import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Homepage.css'

const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let startTime = null;
    let animationFrameId = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
};


const HomePage = () => {
  const navigate = useNavigate();
  const [noticeDetail, setNoticeDetail] = useState([]);
  const [countersVisible, setCountersVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const gettingNotice = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/notice/getNotice`);
      if (data.success) {
        setNoticeDetail(data?.notice);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingNotice();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <>
        {/* Modern Hero Carousel */}
        <div id="heroCarousel" className="carousel slide position-relative" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-indicators position-absolute" style={{ bottom: '30px', zIndex: 10 }}>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to={1} aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to={2} aria-label="Slide 3"></button>
          </div>
          
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="hero-slide position-relative d-flex align-items-center justify-content-center" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}>
                <div className="hero-overlay position-absolute w-100 h-100" style={{
                  background: 'linear-gradient(135deg, rgba(13,110,253,0.85) 0%, rgba(10,88,202,0.75) 100%)',
                  top: 0,
                  left: 0
                }}></div>
                <div className="container text-center text-white position-relative" style={{ zIndex: 2 }}>
                  <div className="hero-content animate__animated animate__fadeInUp">
                    <h1 className="display-1 fw-bold mb-4 hero-title" style={{ 
                      textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                      lineHeight: '1.1'
                    }}>
                      MY SCHOOL
                    </h1>
                    <p className="lead fs-2 mb-5 hero-subtitle" style={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      maxWidth: '800px',
                      margin: '0 auto 2rem'
                    }}>
                      Excellence in Education, Building Tomorrow's Leaders
                    </p>
                    <div className="hero-buttons d-flex flex-column flex-sm-row gap-3 justify-content-center">
                      <button 
                        className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold hero-btn"
                        onClick={() => navigate("/about")}
                        style={{ 
                          background: '#ffffff',
                          color: '#0d6efd',
                          border: 'none',
                          boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                          fontSize: '1.1rem',
                          minWidth: '200px'
                        }}
                      >
                        Discover Our Story
                      </button>
                      <button 
                        className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold hero-btn"
                        onClick={() => navigate("/contact")}
                        style={{ 
                          borderWidth: '2px',
                          fontSize: '1.1rem',
                          minWidth: '200px'
                        }}
                      >
                        Get In Touch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="carousel-item">
              <div className="hero-slide position-relative d-flex align-items-center justify-content-center" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80")',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}>
                <div className="hero-overlay position-absolute w-100 h-100" style={{
                  background: 'linear-gradient(135deg, rgba(13,110,253,0.85) 0%, rgba(10,88,202,0.75) 100%)',
                  top: 0,
                  left: 0
                }}></div>
                <div className="container text-center text-white position-relative" style={{ zIndex: 2 }}>
                  <div className="hero-content">
                    <h2 className="display-2 fw-bold mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
                      Modern Learning Environment
                    </h2>
                    <p className="lead fs-3 mb-5" style={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      maxWidth: '700px',
                      margin: '0 auto'
                    }}>
                      State-of-the-art facilities for comprehensive education
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="carousel-item">
              <div className="hero-slide position-relative d-flex align-items-center justify-content-center" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80")',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}>
                <div className="hero-overlay position-absolute w-100 h-100" style={{
                  background: 'linear-gradient(135deg, rgba(13,110,253,0.85) 0%, rgba(10,88,202,0.75) 100%)',
                  top: 0,
                  left: 0
                }}></div>
                <div className="container text-center text-white position-relative" style={{ zIndex: 2 }}>
                  <div className="hero-content">
                    <h2 className="display-2 fw-bold mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
                      Inspiring Excellence
                    </h2>
                    <p className="lead fs-3 mb-5" style={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      maxWidth: '700px',
                      margin: '0 auto'
                    }}>
                      Nurturing potential, creating bright futures
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Single Navigation Buttons */}
          <button className="carousel-control-prev position-absolute" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" style={{
            left: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            backdropFilter: 'blur(10px)',
            zIndex: 10
          }}>
            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ width: '20px', height: '20px' }}></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next position-absolute" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" style={{
            right: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            backdropFilter: 'blur(10px)',
            zIndex: 10
          }}>
            <span className="carousel-control-next-icon" aria-hidden="true" style={{ width: '20px', height: '20px' }}></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Animated Statistics Section */}
       <section 
      ref={sectionRef}
      className="stats-section py-5" 
      style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}
    >
      <div className="container">
        <h2 className="section-title">Our Achievements</h2>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="text-center text-white stats-item">
              <div className="mb-3">
                <span className="display-3 fw-bold">
                  {countersVisible ? <Counter target={1500} duration={2000} /> : '0'}
                </span>
                <span className="display-4 fw-bold">+</span>
              </div>
              <h5 className="fw-bold mb-2">Students</h5>
              <p className="mb-0 opacity-75">Active learners across all grades</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="text-center text-white stats-item">
              <div className="mb-3">
                <span className="display-3 fw-bold">
                  {countersVisible ? <Counter target={75} duration={2000} /> : '0'}
                </span>
                <span className="display-4 fw-bold">+</span>
              </div>
              <h5 className="fw-bold mb-2">Expert Teachers</h5>
              <p className="mb-0 opacity-75">Qualified and experienced educators</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="text-center text-white stats-item">
              <div className="mb-3">
                <span className="display-3 fw-bold">
                  {countersVisible ? <Counter target={25} duration={2000} /> : '0'}
                </span>
                <span className="display-4 fw-bold">+</span>
              </div>
              <h5 className="fw-bold mb-2">Years of Excellence</h5>
              <p className="mb-0 opacity-75">Serving the community with pride</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="text-center text-white stats-item">
              <div className="mb-3">
                <span className="display-3 fw-bold">
                  {countersVisible ? <Counter target={98} duration={2000} /> : '0'}
                </span>
                <span className="display-4 fw-bold">%</span>
              </div>
              <h5 className="fw-bold mb-2">Success Rate</h5>
              <p className="mb-0 opacity-75">Students achieving their goals</p>
            </div>
          </div>
        </div>
      </div>
    </section>

        {/* About Section */}
        <section className="py-5 animate-on-scroll" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <div className="pe-lg-4">
                  <h2 className="display-5 fw-bold mb-4" style={{ color: '#0d6efd' }}>About Our School</h2>
                  <p className="lead mb-4" style={{ color: '#6c757d', fontSize: '1.2rem' }}>
                    We are committed to providing exceptional education that nurtures young minds and prepares students for success in an ever-changing world. Our dedicated faculty and modern facilities create an environment where learning thrives.
                  </p>
                  <p className="mb-4" style={{ color: '#6c757d' }}>
                    With a rich tradition of academic excellence and a forward-thinking approach to education, we foster creativity, critical thinking, and character development. Our comprehensive programs ensure every student reaches their full potential while building lifelong friendships and memories.
                  </p>
                  <div className="d-flex flex-wrap gap-3 mb-4">
                    <div className="d-flex align-items-center">
                      <span className="badge rounded-pill me-2" style={{ backgroundColor: '#0d6efd', fontSize: '1rem', padding: '0.5rem 1rem' }}>✓</span>
                      <span style={{ color: '#495057' }}>Modern Infrastructure</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge rounded-pill me-2" style={{ backgroundColor: '#0d6efd', fontSize: '1rem', padding: '0.5rem 1rem' }}>✓</span>
                      <span style={{ color: '#495057' }}>Expert Faculty</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge rounded-pill me-2" style={{ backgroundColor: '#0d6efd', fontSize: '1rem', padding: '0.5rem 1rem' }}>✓</span>
                      <span style={{ color: '#495057' }}>Holistic Development</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-lg px-4 py-3 rounded-pill fw-bold hover-btn"
                    style={{ 
                      background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                      border: 'none',
                      color: '#ffffff',
                      boxShadow: '0 6px 20px rgba(13,110,253,0.3)'
                    }}
                    onClick={() => navigate("/about")}
                  >
                    Learn More About Us
                  </button>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Our School Building" 
                    className="img-fluid rounded-4 shadow-lg w-100"
                    style={{ 
                      objectFit: 'cover', 
                      height: '450px',
                      border: '4px solid #ffffff'
                    }}
                  />
                  <div 
                    className="position-absolute rounded-4" 
                    style={{
                      top: '20px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                      padding: '1rem 1.5rem',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 15px rgba(13,110,253,0.3)'
                    }}
                  >
                    Est. 1998
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-5 animate-on-scroll" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3" style={{ color: '#0d6efd' }}>Our Key Areas</h2>
              <p className="lead" style={{ color: '#6c757d' }}>Comprehensive education tailored for student success</p>
            </div>
            
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-card" style={{ transition: 'all 0.4s ease' }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center icon-hover"
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                          boxShadow: '0 6px 20px rgba(13,110,253,0.3)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>🎓</span>
                      </div>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#0d6efd' }}>Admissions</h4>
                    <p style={{ color: '#6c757d' }} className="mb-0">
                      Join our community of learners with a streamlined admission process designed to welcome talented students from diverse backgrounds.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-card" style={{ transition: 'all 0.4s ease' }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center icon-hover"
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                          boxShadow: '0 6px 20px rgba(13,110,253,0.3)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>📚</span>
                      </div>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#0d6efd' }}>Academics</h4>
                    <p style={{ color: '#6c757d' }} className="mb-0">
                      Rigorous academic programs that challenge students to excel while providing the support needed for success in higher education.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-card" style={{ transition: 'all 0.4s ease' }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-4">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center icon-hover"
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                          boxShadow: '0 6px 20px rgba(13,110,253,0.3)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>📝</span>
                      </div>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#0d6efd' }}>Examinations</h4>
                    <p style={{ color: '#6c757d' }} className="mb-0">
                      Fair and comprehensive assessment methods that accurately measure student progress and prepare them for future challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5 animate-on-scroll" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3" style={{ color: '#0d6efd' }}>Why Choose Us</h2>
              <p className="lead" style={{ color: '#6c757d' }}>Excellence in every aspect of education</p>
            </div>
            
            <div className="row g-4">
              <div className="col-lg-6 col-md-12">
                <div className="d-flex align-items-start mb-4 feature-item">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-4"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>🏆</span>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>Award-Winning Programs</h5>
                    <p style={{ color: '#6c757d' }} className="mb-0">
                      Recognized for excellence in academic achievement and innovative teaching methodologies.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6 col-md-12">
                <div className="d-flex align-items-start mb-4 feature-item">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-4"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>🌟</span>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>Individual Attention</h5>
                    <p style={{ color: '#6c757d' }} className="mb-0">
                      Small class sizes ensure personalized learning experiences for every student.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6 col-md-12">
                <div className="d-flex align-items-start mb-4 feature-item">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-4"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>🎨</span>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>Creative Arts Program</h5>
                    <p style={{ color: '#6c757d' }} className="mb-0">
                      Comprehensive arts education including music, visual arts, and performing arts.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6 col-md-12">
                <div className="d-flex align-items-start mb-4 feature-item">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-4"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>⚽</span>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>Sports Excellence</h5>
                    <p style={{ color: '#6c757d' }} className="mb-0">
                      State-of-the-art sports facilities and championship-winning athletic programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
      <section className="py-5 animate-on-scroll" style={{ backgroundColor: '#ffffff' }}>
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="display-5 fw-bold mb-3" style={{ color: '#0d6efd' }}>Meet Our Faculty</h2>
      <p className="lead" style={{ color: '#6c757d' }}>Dedicated educators shaping tomorrow's leaders</p>
    </div>

    <div className="row g-4">
      {/* Faculty 1 */}
      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow-sm h-100 hover-card faculty-card" style={{ transition: 'all 0.4s ease' }}>
          <div className="position-relative overflow-hidden">
            <img 
              src="/images/fac1.avif" 
              className="card-img-top w-100" 
              alt="Principal"
              style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            />
          </div>
          <div className="card-body text-center p-4">
            <h5 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>Dr. Sarah Johnson</h5>
            <p className="text-muted mb-2">Principal</p>
            <p style={{ color: '#6c757d' }} className="small mb-0">
              Experienced leader with a PhD in Education, passionate about student success and innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Faculty 2 */}
      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow-sm h-100 hover-card faculty-card" style={{ transition: 'all 0.4s ease' }}>
          <div className="position-relative overflow-hidden">
            <img 
              src="/images/fac2.avif" 
              className="card-img-top w-100" 
              alt="Teacher"
              style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            />
          </div>
          <div className="card-body text-center p-4">
            <h5 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>Mr. John Smith</h5>
            <p className="text-muted mb-2">Mathematics Teacher</p>
            <p style={{ color: '#6c757d' }} className="small mb-0">
              Specialist in advanced mathematics and problem-solving with 15+ years of teaching experience.
            </p>
          </div>
        </div>
      </div>

      {/* Faculty 3 */}
      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow-sm h-100 hover-card faculty-card" style={{ transition: 'all 0.4s ease' }}>
          <div className="position-relative overflow-hidden">
            <img 
              src="/images/fac3.avif" 
              className="card-img-top w-100" 
              alt="Sports Director"
              style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            />
          </div>
          <div className="card-body text-center p-4">
            <h5 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>Ms. Emily Davis</h5>
            <p className="text-muted mb-2">Sports Director</p>
            <p style={{ color: '#6c757d' }} className="small mb-0">
              Former Olympic athlete and certified sports coach with expertise in youth development programs.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Events and Notices Section */}
       {noticeDetail.length > 0 ?
       <>
          <section className="py-5 animate-on-scroll" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#0d6efd' }}>
              Latest Events & Notices
            </h2>
            <p className="lead" style={{ color: '#6c757d' }}>
              Stay updated with our school activities and announcements
            </p>
          </div>

          <div className="row g-4">
            {noticeDetail.slice(0, 6).map((notice, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div
                  className="card h-100 border-0 shadow-sm hover-card notice-card"
                  style={{ transition: "all 0.4s ease" }}
                >
                  <div
                    className="card-img-top-wrapper overflow-hidden"
                    style={{ height: "220px" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/notice/get-photo/${notice._id}`}
                      alt={notice.title}
                      className="card-img-top w-100"
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold mb-3" style={{ color: "#0d6efd" }}>
                      {notice.title}
                    </h5>
                    <p className="card-text flex-grow-1 mb-4" style={{ color: "#6c757d" }}>
                      {notice.description.slice(0, 100)}...
                    </p>
                    <div className="text-center d-flex">
                      <button
                        className="btn rounded-pill px-4 py-2 fw-bold hover-btn"
                        style={{
                          background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
                          border: "none",
                          color: "#ffffff",
                          boxShadow: "0 4px 15px rgba(13,110,253,0.3)",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => navigate(`/notice-board-Detail/${notice._id}`)}
                      >
                        Read Full Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       </>
       :""}


        {/* Call to Action Section */}
        <section className="py-5 animate-on-scroll" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}>
          <div className="container">
            <div className="text-center text-white">
              <h2 className="display-5 fw-bold mb-4">Ready to Join Our Community?</h2>
              <p className="lead mb-4 opacity-90" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                Take the first step towards your child's bright future with quality education and holistic development.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button 
                  className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold hover-btn"
                  style={{ color: '#0d6efd', minWidth: '200px' }}
                  onClick={() => navigate("/admissions")}
                >
                  Apply Now
                </button>
                <button 
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold hover-btn"
                  style={{ borderWidth: '2px', minWidth: '200px' }}
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>

       

        {/* Counter Animation Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Counter animation function
            function animateCounters() {
              const counters = document.querySelectorAll('.counter');
              
              counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                  if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                  } else {
                    counter.textContent = target;
                  }
                };
                
                // Start animation when element is visible
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting && !counter.classList.contains('animated')) {
                      counter.classList.add('animated');
                      updateCounter();
                    }
                  });
                });
                
                observer.observe(counter);
              });
            }
            
            // Initialize when DOM is loaded
            document.addEventListener('DOMContentLoaded', animateCounters);
          `
        }} />
      </>
      </Layout>
      
    )}

    export default HomePage;