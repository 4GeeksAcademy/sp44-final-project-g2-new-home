import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-auto py-4 text-center">
    <div className="container" id="main">
      <div className="row">
        <div className="col-md-4">
          <div className="col">
            <h4 className="footer-title">Contacta con nosotros</h4>
            <ul>
              <li>Camino de las Erizas, 4</li>
              <li>29011 Málaga</li>
              <li>T. 951 946 977</li>
              <li>Email: <a href="mailto:contacto@protectoramalaga.com" title="Escríbenos">contacto@protectoramalaga.com</a></li>
            </ul>
          </div>
        </div>

        {/* <div className="col-md-4">
          <div className="col">
            <h4 className="footer-title">Disclaimer</h4>
            <p className="footer-text">
              This website and its content are for informational purposes only. The information provided on this website does not constitute legal or professional advice. It is provided "as is" and without warranty of any kind. The use of this website does not create an attorney-client or professional-client relationship. Any action you take based on the information from this website is at your own risk and responsibility.
            </p>
            <p className="footer-text">
              Laws and regulations may vary by jurisdiction and change over time. It is important to consult with a legal professional or subject matter expert for specific advice related to your situation.
            </p>
            <p className="footer-text">
              All copyrights and other intellectual property rights in the content and design of this website are owned by [Your Name or Company Name] unless otherwise indicated.
            </p>
          </div>
        </div> */}

        <div className="col-md-4">
          <div className="col col-social-icons">
            <h4 className="footer-title">Síguenos</h4>
            {/* Agrega aquí tus íconos y enlaces a redes sociales */}
            <a href="https://www.facebook.com/tupagina" target="_blank"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-skype"></i></a>
            <a href="#"><i className="fa fa-youtube-play"></i></a>
          </div>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-lg-9 copyright">
          2014 © Tu empresa. Todos los derechos reservados.
          <a href="https://sites.google.com/view/areaprivadaspapm" target="_blank" style={{ marginLeft: "20px", color: "#fff" }}>Área Privada</a> |
          <a href="7-vc-aviso-legal.html" style={{ color: "#fff" }}>Aviso legal</a> |
          <a href="31-vc-politica-de-privacidad.html" style={{ color: "#fff" }}>Política de privacidad</a> |
          <a href="30-vc-politica-de-cookies.html" style={{ color: "#fff" }}>Política de cookies</a>
        </div>
        <div className="col-lg-3 footer-logo">
          {/* Agrega aquí tu logotipo si lo deseas */}
        </div>
      </div>
    </div>
  </footer>
);
