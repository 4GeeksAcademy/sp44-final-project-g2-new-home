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
    // Puedes agregar aquí la lógica para enviar el correo
    alert(`Email enviado a: ${email}`);
  };

  const googleMapsLink = "https://www.google.com/maps/place/4+Erizas+Road,+Málaga,+29011";

  return (
    <footer className="footer mt-auto py-4 text-center">
      <div className="container" id="main">
        
        <div className="row">
          <div className="col-md-4">
            <div className="contact">
              <h4><b>Contact Us</b></h4>
              <ul className="contact-list">
                <li>
                  Calle:{" "}
                  <a
                    href="https://www.google.com/maps/place/C.+Pina+Dom%C3%ADnguez,+5,+29017+M%C3%A1laga/@36.7227046,-4.3814044,17z/data=!3m1!4b1!4m6!3m5!1s0xd725815304d098f:0xd2475e8a286e56c1!8m2!3d36.7227046!4d-4.3788295!16s%2Fg%2F11c5l4jwhm?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pina Domínguez, 5, 29017 Málaga
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:contact@protectoramalaga.com"
                    title="Email Us"
                  >
                    contact@protectoramalaga.com
                  </a>
                </li>
                <li>Phone: 951 946 977</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="newsletter">
              <h4><b>Newsletter</b></h4>
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
              <h4><b>Follow Us</b></h4>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-lg-12 text-center">
            &copy; 2023 New home. All rights reserved.
            {/* <a id="privatearea"
              href="https://sites.google.com/view/privatearea"
              target="_blank"
              className="custom-link"
            >
            Private Area
            </a> */}
            <a href="policy" className="custom-link">
              Legal Policies
            </a>
            {/* <a
              href="privacy-policy.html"
              className="custom-link"
            >
              Privacy Policy
            </a>
            <a href="cookie-policy.html" className="custom-link">
              Cookie Policy
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
