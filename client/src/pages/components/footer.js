import { Link } from 'react-router-dom';
import '../../css/Footer.css'

const Footer = () => {
  return (
    <>
      <footer className="school-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="footer-heading">About Our School</h5>
              <p className="footer-about">
                Excellence in Education since 1995. We are committed to providing 
                a nurturing environment that fosters academic achievement, character 
                development, and lifelong learning for all our students.
              </p>
              <div className="footer-contact">
                <p><i className="fas fa-map-marker-alt"></i> 123 Education Street, Learning City</p>
                <p><i className="fas fa-phone"></i> (555) 123-4567</p>
                <p><i className="fas fa-envelope"></i> info@myschool.edu</p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 col-sm-6 mb-4 mb-md-0">
              <h5 className="footer-heading">Academics</h5>
              <ul className="footer-links">
                <li><Link to="/programs">Programs</Link></li>
                <li><Link to="/curriculum">Curriculum</Link></li>
                <li><Link to="/faculty">Faculty</Link></li>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/research">Research</Link></li>
                <li><Link to="/calendar">Academic Calendar</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 col-sm-6 mb-4 mb-md-0">
              <h5 className="footer-heading">Student Life</h5>
              <ul className="footer-links">
                <li><Link to="/activities">Activities</Link></li>
                <li><Link to="/athletics">Athletics</Link></li>
                <li><Link to="/arts">Arts</Link></li>
                <li><Link to="/clubs">Clubs</Link></li>
                <li><Link to="/housing">Housing</Link></li>
                <li><Link to="/campus">Campus Map</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12">
              <h5 className="footer-heading">Newsletter Subscription</h5>
              <p className="footer-newsletter-text">
                Subscribe to our newsletter to receive updates on school events, 
                important announcements, and academic achievements.
              </p>
              <form className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Your email address" 
                    aria-label="Your email address" 
                  />
                  <button className="btn btn-subscribe" type="submit">
                    Subscribe <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
              
              <div className="footer-social mt-4">
                <h5 className="footer-heading">Follow Us</h5>
                <div className="social-icons">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="footer-divider" />
          
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <p className="copyright-text">
                © {new Date().getFullYear()} My School. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 col-sm-12">
              <ul className="footer-bottom-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Use</Link></li>
                <li><Link to="/accessibility">Accessibility</Link></li>
                <li><Link to="/sitemap">Sitemap</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;