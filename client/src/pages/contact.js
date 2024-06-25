import React from "react";
import Layout from "./components/Layout";

const Contact = () => {
  return (
    <Layout>
     <div className="Main-contact">
      <div className="ffbox random-box text-center">
        <div className="ffbox1 random-form-container">
          <h1 className="gfg random-title">MY SCHOOL</h1>
          <h2 className="random-contact-heading">Contact Us</h2>
          <form className="random-form">
            <label htmlFor="fullName" className="random-label">
              <i className="fa fa-solid fa-user random-icon" style={{ margin: 2 }}></i> Full Name:
            </label>
            <input type="text" id="fullName" name="fullName" className="random-input" required />
            <label htmlFor="email" className="random-label">
              <i className="fa fa-solid fa-envelope random-icon" style={{ margin: 2 }}></i>
              Email Address:
            </label>
            <input type="email" id="email" name="email" className="random-input" required />
            <label htmlFor="mobile" className="random-label">
              <i className="fa fa-solid fa-phone random-icon" style={{ margin: 2 }}></i>
              Contact No:
            </label>
            <input type="tel" id="mobile" name="mobile" className="random-input" required />
            <label htmlFor="msg" className="random-label">
              <i className="fa fa-solid fa-comment random-icon" style={{ margin: 2 }}></i>
              Write Message:
            </label>
            <textarea id="msg" name="msg" rows={5} className="random-textarea" required defaultValue={" \n            "} />
            <button type="submit" className="random-button">
              Submit
            </button>
          </form>
        </div>
        <div className="map-div random-map-container m-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.5060353036036!2d73.04788431522357!3d33.68442008070432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf2e03547c87%3A0x9467c5f5c1c9ad6c!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1624557378192!5m2!1sen!2s" width={370} height="95%" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="random-iframe"></iframe>
        </div>
      </div>
      </div>

    </Layout>
  );
};

export default Contact;
