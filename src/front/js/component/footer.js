import React from "react";
import "../../styles/index.css";
import { useLocation } from "react-router-dom"; 

export const Footer = () => {
  
  const location = useLocation();
  const shouldApplyFondoClass = () => {
    return location.pathname === "/";
  };
  
  return (
    <div className={`wrapper  ${shouldApplyFondoClass() ? "fondo" : ""}`}>
      <div className="content">
      </div>
      <footer className="custom-footer mt-auto text-center text-light">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-md-3">
                <h4 className="text-light mt-3"><b>Contact Us</b></h4>
                <ul className="ul bg-transparent shadow-none text-white text-start mx-auto py-4" style={{maxWidth: "88%"}}>
                  <li className="list-group-item-circle ms-4  ps-2">
                    <b>Street:{" "}{" "}</b>
                    <a
                      href="https://www.google.com/maps/place/C.+Pina+Dom%C3%ADnguez,+5,+29017+M%C3%A1laga/@36.7227046,-4.3814044,17z/data=!3m1!4b1!4m6!3m5!1s0xd725815304d098f:0xd2475e8a286e56c1!8m2!3d36.7227046!4d-4.3788295!16s%2Fg%2F11c5l4jwhm?entry=ttu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="custom-link"
                    >
                      Pina Domínguez, 5, 29017 Málaga
                    </a>
                  </li >
                  <li className="list-group-item-circle ms-4  ps-2">
                    <b>Email:{" "}{" "}</b> 
                    <a
                      href="mailto:contact@protectoramalaga.com"
                      title="Email Us"
                      className="custom-link"
                    >
                      contact@new_home.com
                    </a>
                  </li>
                  <li className=" ps-2 list-group-item-circle ms-4"><b>Phone:{" "}</b> 951 946 977</li>
                </ul>
            </div>
            <div className="col-md-3">
                <h4 className="text-light mt-3 mb-4"><b>Follow Us</b></h4>
                <div className="">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook text-light mt-2 fs-1"></i>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram text-light mx-3 fs-1 mt-2"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter text-light fs-1 mt-2 "></i>
                  </a>
                </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 text-center">
              &copy; 2023 New home. All rights reserved.
              <a href="policy" className="custom-link ms-1">
                Legal Policies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
