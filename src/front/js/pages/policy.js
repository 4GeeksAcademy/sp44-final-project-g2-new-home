import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import portada from "../../img/portada.png";
import "../../styles/index.css";

export const Policy = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
        <div className="card">
            <h1 className="text-dark">Disclaimer for New Home</h1>
          <div className="card-body text-start">
            
            <h2>Disclaimer</h2>
            <p className="text-start">Last updated: September 21, 2023</p>
            <h2 className="mb-4"><b>Interpretation and Definitions</b></h2>
            <h4>Interpretation</h4>
            <p className="text-start">
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions shall
              have the same meaning regardless of whether they appear in singular or
              in plural.
            </p>
    
            <h5>Definitions</h5>
            <p className="text-start">
              For the purposes of this Disclaimer:
              <br />
              <strong>
                Company (referred to as either "the Company", "We", "Us" or "Our" in
                this Disclaimer)
              </strong>{" "}
              refers to New Home.
              <br />
              <strong>Service</strong> refers to the Application.
              <br />
              <strong>You</strong> means the individual accessing the Service, or
              the company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
              <br />
              <strong>Application</strong> means the software program provided by
              the Company downloaded by You on any electronic device named New Home.
            </p>
    
            <h3>Disclaimer</h3>
            <p className="text-start">
              The information contained on the Service is for general information
              purposes only.
            </p>
            <p className="text-start">
              The Company assumes no responsibility for errors or omissions in the
              contents of the Service.
            </p>
            <p className="text-start">
              In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice. This Disclaimer has been created with the help of the Disclaimer Generator.
            </p>
            <p className="text-start">
              The Company does not warrant that the Service is free of viruses or other harmful components.
            </p>
            <h3>External Links Disclaimer</h3> 
            <p className="text-start">
                The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.
            </p>
            <p className="text-start">
                Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.           
            </p>
            <h3>Errors and Omissions Disclaimer</h3>
            <p className="text-start">
                The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.            
            </p>
            <p className="text-start">
                The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.
            </p>
            <h3>Fair Use Disclaimer</h3>
            <p className="text-start">
                The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.
            </p>
            <p className="text-start">
                If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.
            </p>

            <p className="text-start">
                The Company believes this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the United States Copyright law.
            </p>
            <h3>Views Expressed Disclaimer</h3>
            <p className="text-start">
                The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.
            </p>
            <p className="text-start">
                Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.
            </p>
            <h3>No Responsibility Disclaimer</h3>
            <p className="text-start">
            The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.
            </p>
            <p className="text-start">
            In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.
            </p>
            <h3>"Use at Your Own Risk" Disclaimer</h3>
            <p className="text-start">
                All information in the Service is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.
            </p>
            <p className="text-start">
                The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.
            </p>
            <h3>Contact Us</h3>
            <p className="text-start">
                If you have any questions about this Disclaimer, You can contact Us:   
            </p>
            <p className="text-start">
                By email: <a href="asertetete1@gmail.com">asertetete1@gmail.com</a>
            </p>

            </div>
            </div>
        </div>
    );
};
