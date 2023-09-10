import React, { useState } from "react";
import "../../styles/footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add the logic here to send the email
    alert(`Email sent to: ${email}`);
  };

  return (
    <footer className="footer mt-auto py-4 text-center">
      <div className="container" id="main">
        <div className="row">
          <div className="col-md-4">
            <div className="contact">
              <h4>Contact Us</h4>
              <ul className="contact-list">
                <li>4 Erizas Road</li>
                <li>Málaga, 29011</li>
                <li>Phone: 951 946 977</li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:contact@protectoramalaga.com"
                    title="Email Us"
                  >
                    contact@protectoramalaga.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="newsletter">
              <h4>Newsletter</h4>
              <p>Receive our latest updates in your email</p>
              <form className="form-inline" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-primary"
                      type="submit"
                    >
                      Send
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="social-icons">
              <h4>Follow Us</h4>
              <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-lg-12 text-center">
            &copy; 2023 New home. All rights reserved.
            <a
              href="https://sites.google.com/view/privatearea"
              target="_blank"
              className="custom-link"
            >
              Private Area
            </a>{" "}
            |{" "}
            <a href="legal-notice.html" className="custom-link">
              Legal Notice
            </a>{" "}
            |{" "}
            <a
              href="privacy-policy.html"
              className="custom-link"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="cookie-policy.html" className="custom-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
