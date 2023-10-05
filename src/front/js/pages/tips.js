import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import tip_1 from "../../img/tip_1.png";
import tip_2 from "../../img/tip_2.png";
import tip_3 from "../../img/tip_3.png";
import tip_4 from "../../img/tip_4.jpg";
import tip_5 from "../../img/tip_5.png";
import tip_6 from "../../img/tip_6.png";
import "../../styles/index.css";

export const Tips = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className=" animate__animated animate__bounceInRight text-center mb-5 mt-5">
        <h1 className="esmeralda">Tips for Pet Adoption</h1>
      </div> 
      <div className="row d-flex justify-content-center">
        <div id="sidebartips" className="col-md-2">
          <div className="sidebar animate__animated animate__backInUp border border-4 rounded-2" id="sticky-legend">
            <ul className="nav flex-column">
              <li className="nav-item border-bottom border-4 leyendadifuminado rounded-top-1">
                <h5 className="text-center p-3 text-light">Go to the one that interests you most{"\u00A0"}{"\u00A0"}{"\u00A0"}<i className="fas fa-paw text-light"></i></h5>
                
              </li>
              <li className="nav-item  border-bottom border-4">
                <a className="nav-link text-primary-emphasis custom-tr-tips" id="a1" href="#tip1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-cursor-fill" viewBox="0 0 16 16">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                  </svg> 
                  Go to tip for peaceful coexistence 
                </a>
              </li>
              <li className="nav-item border-bottom border-4">
                <a className="nav-link text-primary-emphasis custom-tr-tips" id="a2" href="#tip2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-cursor-fill" viewBox="0 0 16 16">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                  </svg>
                  Go to tip for introducing a new cat to your home
                </a>
              </li>
              <li className="nav-item border-bottom border-4">
                <a className="nav-link text-primary-emphasis custom-tr-tips" id="a3" href="#tip3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-cursor-fill" viewBox="0 0 16 16">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                  </svg>
                  Go to tip for successful dog and cat walks
                </a>
              </li>
              <li className="nav-item custom-tr-tips border-bottom border-4">
                <a className="nav-link text-primary-emphasis " id="a4" href="#tip4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-cursor-fill" viewBox="0 0 16 16">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                  </svg>
                  Go to tip for introducing pets into a home with children
                </a>
              </li>
              <li className="nav-item custom-tr-tips border-bottom border-4">
                <a className="nav-link text-primary-emphasis " id="a5" href="#tip5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-cursor-fill" viewBox="0 0 16 16">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                  </svg>
                  Go to tip for teaching your pet basic training commands
                </a>
              </li>
              <li className="nav-item custom-tr-tips rounded-bottom border-4">
                <a className="nav-link text-primary-emphasis " id="a6" href="#tip6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-cursor-fill" viewBox="0 0 16 16">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                  </svg>
                  Go to tip for providing a safe home for your pets
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9" id="main1">
          <div className="container text-center">         
            <div className="card  text-center animate__animated animate__bounceInUp rounded-4" id="tip1">
              <h3 className="card-title">Tip for peaceful coexistence</h3>
              <img src={tip_1} alt="Tip 1" className="Foto tip1" />
              <div className="card-body">
                <p className="card-text">
                  Achieving a harmonious coexistence between dogs and cats in the same home requires patience and care. Here are some essential tips:
                </p>
                <p className="card-text">
                  <strong>Step 1: Controlled introduction</strong><br />
                  Start by keeping the dog and the cat in separate rooms. Allow them to become familiar with each other's scent through exchanged toys and blankets.
                </p>
                <p className="card-text">
                  <strong>Step 2: Visual introduction</strong><br />
                  After a few days, allow them to see each other through a slightly opened door. This allows them to observe each other without direct contact.
                </p>
                <p className="card-text">
                  <strong>Step 3: Direct supervision</strong><br />
                  Once they are comfortable with each other's presence, let them be together under direct supervision. Observe their interactions closely and intervene if tensions arise.
                </p>
                <p className="card-text">
                  <strong>Step 4: Positive reinforcement</strong><br />
                  Reward both pets with treats and praise when they behave in a friendly and calm manner near each other.
                </p>
                <p className="card-text">
                  <strong>Step 5: Time and patience</strong><br />
                  Peaceful coexistence may take time, especially if one of them is not used to the other's presence. Continue to supervise and be patient throughout the process.
                </p>
              </div>
            </div>

            <div className="card text-center" id="tip2">
              <h3 className="card-title">Tip for introducing a new cat to your home</h3>
              <img src={tip_2} alt="Tip 2" className="Foto tip2" />
              <div className="card-body">
                <p className="card-text">
                  When introducing a new cat to your home, it is essential to provide a peaceful environment for adaptation. Follow these key steps:
                </p>
                <p className="card-text">
                  <strong>Step 1: Safe space</strong><br />
                  Keep the new cat in a separate room with its litter box, food, and water. This will give them time to acclimate and feel secure in their new surroundings.
                </p>
                <p className="card-text">
                  <strong>Step 2: Gradual introductions</strong><br />
                  Introduce the new cat to current residents gradually. Use partially opened doors and allow them to smell and see each other before direct encounters.
                </p>
                <p className="card-text">
                  <strong>Step 3: Supervision</strong><br />
                  Monitor interactions between the cats during the first few weeks. Intervene if tension arises and make sure to give them plenty of time to adjust.
                </p>
                <p className="card-text">
                  <strong>Step 4: Positive reinforcement</strong><br />
                  Reward all cats with affection and treats when they behave amicably towards each other.
                </p>
              </div>
            </div>

            <div className="card text-center" id="tip3">
              <h3 className="card-title">Tip for successful dog and cat walks</h3>
              <img src={tip_3} alt="Tip 3" className="Foto tip3" />
              <div className="card-body">
                <p className="card-text">
                  If you want to take your dog and cat for walks together, consider the following:
                </p>
                <p className="card-text">
                  <strong>Step 1: Individual training</strong><br />
                  Ensure that both the dog and the cat are well-trained before attempting walks together. Both should respond to basic commands.
                </p>
                <p className="card-text">
                  <strong>Step 2: Secure leashes</strong><br />
                  Use safe leashes and harnesses for both animals. Maintain a safe distance between them and allow them to become accustomed to walking together gradually.
                </p>
                <p className="card-text">
                  <strong>Step 3: Observe cues</strong><br />
                  Pay attention to signs of stress or aggression. If either animal appears uncomfortable, stop the walk and continue working on their socialization.
                </p>
              </div>
            </div>

            <div className="card text-center" id="tip4">
              <h3 className="card-title">Tip for introducing pets into a home with children</h3>
              <img src={tip_4} alt="Tip 4" className="Foto tip4" />
              <div className="card-body">
                <p className="card-text">
                  If you have children at home and plan to introduce a new pet, it's important for everyone to coexist safely and harmoniously. Here are some tips:
                </p>
                <p className="card-text">
                  <strong>Step 1: Education</strong><br />
                  Educate your children about respecting animals and the importance of treating the pet gently and with care.
                </p>
                <p className="card-text">
                  <strong>Step 2: Supervision</strong><br />
                  Supervise initial interactions between children and the pet. Ensure that both parties feel comfortable.
                </p>
                <p className="card-text">
                  <strong>Step 3: Quality time</strong><br />
                  Dedicate quality time for children and the pet to get to know each other and develop a positive bond.
                </p>
              </div>
            </div>

            <div className="card text-center" id="tip5">
              <h3 className="card-title">Tip for teaching your pet basic training commands</h3>
              <img src={tip_5} alt="Tip 5" className="Foto tip5" />
              <div className="card-body">
                <p className="card-text">
                  Training is essential for harmonious coexistence. Here are some guidelines for teaching basic commands to your pet:
                </p>
                <p className="card-text">
                  <strong>Step 1: Consistency</strong><br />
                  Be consistent with your commands and rewards. Use positive reinforcement such as treats and petting.
                </p>
                <p className="card-text">
                  <strong>Step 2: Regular practice</strong><br />
                  Dedicate time every day to practice commands like "sit," "stay," and "come." Make training fun for your pet.
                </p>
                <p className="card-text">
                  <strong>Step 3: Patience</strong><br />
                  Be patient and reinforce good behavior. Don't get frustrated if your pet needs time to learn.
                </p>
              </div>
            </div>

            <div className="card text-center" id="tip6">
              <h3 className="card-title">Tip for providing a safe home for your pets</h3>
              <img src={tip_6} alt="Tip 6" className="Foto tip6" />
              <div className="card-body">
                <p className="card-text">
                  Ensuring a safe home is essential for the health and happiness of your pets. Here are some key measures:
                </p>
                <p className="card-text">
                  <strong>Step 1: Remove hazards</strong><br />
                  Remove toxic chemicals, poisonous plants, and small objects that can be ingested.
                </p>
                <p className="card-text">
                  <strong>Step 2: Food out of reach</strong><br />
                  Keep food and sweets out of reach of your pets to prevent poisoning.
                </p>
                <p className="card-text">
                  <strong>Step 3: Supervision</strong><br />
                  Supervise your pets in the home and garden to ensure their safety at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
