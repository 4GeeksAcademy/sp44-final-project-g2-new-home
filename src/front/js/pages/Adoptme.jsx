import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export const Adoptme = () => {

  const { store, actions } = useContext(Context);
  const [pets, setPets] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const hostPetfinder = 'https://api.petfinder.com/v2/';
  const url = hostPetfinder + 'animal?type=dog&page=1';
  const backupImages = [
    require("../../img/imgError/1.jpg"),
    require("../../img/imgError/2.jpg"),
    require("../../img/imgError/3.jpg"),
    require("../../img/imgError/4.jpg"),
    require("../../img/imgError/5.jpg"),
    require("../../img/imgError/6.jpg"),
    require("../../img/imgError/7.jpg"),
    require("../../img/imgError/8.jpg"),
    require("../../img/imgError/9.jpg"),
    require("../../img/imgError/10.jpg"),
    require("../../img/imgError/11.jpg"),
    require("../../img/imgError/12.jpg"),
    require("../../img/imgError/13.jpg"),
    require("../../img/imgError/14.jpg"),
    require("../../img/imgError/15.jpg"),
    require("../../img/imgError/16.jpg"),
    require("../../img/imgError/17.jpg"),
    require("../../img/imgError/18.jpg"),
    require("../../img/imgError/19.jpg"),
    require("../../img/imgError/20.jpg")
  ]
  const [backupImageIndex, setBackupImageIndex] = useState(0);
  const getAnimal = async (token) => {
    const url = 'https://api.petfinder.com/v2/animals?type=dog&page=1';
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'follow'
    };
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setPets(data.animals);
    } else {
      console.log('error', response.status, response.statusText);
    }
  }
  useEffect(() => {
    actions.get_all_animals();
    actions.fetchToken().then(token => {
      if (token) {
        console.log(token);
        getAnimal(token)
      }
    });
  }, []);
  const handleOnErrorImg = (e) => {
    const newBackupIndex = (backupImageIndex + 1) % backupImages.length;
    setBackupImageIndex(newBackupIndex);
    e.target.src = backupImages[newBackupIndex].default; // Usa .default para obtener la ruta de la imagen importada
  };
  
  const breakpointColumnsObj = {
    default: 5,
    917:3,
    600: 2,
    470: 1
  };

  const filteredAnimals = store.animals.filter((animal) => {
    // const ageMatch = selectedAge.length === 0 || selectedAge.includes(animal.age);
    // const genderMatch = selectedGender === "" || selectedGender === animal.gender;
    const sizeMatch = selectedSize === "" || selectedSize === animal.size;
    return  sizeMatch;
  });

  const filteredPets = pets.filter((animal) => {
    const sizeMatch = selectedSize === "" || selectedSize === animal.size;
    const ageMatch = selectedAge.length === 0 || selectedAge.includes(animal.age);
    const genderMatch = selectedGender === "" || selectedGender === animal.gender;
    return sizeMatch && ageMatch && genderMatch;
  });
  console.log("FILTEEEEEREEEEDS:", filteredAnimals);
  console.log("PEEEEEEEEEEETSFILTEEEEEREEEEDS:", filteredPets);

  
  return (
    <div className="container-fluid px-4 mb-3">
      <h1 className="esmeralda text-center mt-5 mb-5">Adopt a pet</h1>
      <div className="row d-flex justify-content-center p-5">
      <div className="col-md-2 px-0 pt-0 pb-0 card  border border-4 sombra rounded-2" style={{ maxHeight: "380px", overflowY: "auto" }}>
            <div className="leyendadifuminado card-header p-3 text-center" style={{width:"100%"}}>
              <h5 className="text-light"><b>Find faster here{"\u00A0"}{"\u00A0"}{"\u00A0"}<i className="fas fa-paw text-light"></i></b></h5>
            </div>
            <div className="card-body p-3" style={{ flex: "0 0 auto" }}>
              <div className="row d-flex justify-content-center mt-3">
                <div className="col-md-12 d-flex justify-content-center flex-column">
                  <label className="form-label"><b>Age:</b></label>
                  <select
                    className="form-select"
                    value={selectedAge}
                    onChange={(e) => setSelectedAge(e.target.value)}
                  >
                    <option value="">All Ages</option>
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                <label className="form-label"><b>Size:</b></label>
                <select
                  className="form-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">All Sizes</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                <label className="form-label"><b>Gender:</b></label>
                <select
                  className="form-select"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                </div>
              </div>
            </div>
          </div>
        <div className="col-md-10">
        <div className="card fondo py-5 px-4">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          > 
              {filteredAnimals.map((animal, index) => (
                (animal.animal_status === "Adoption") && (
                <div key={animal.id} className="card  rounded col-12 col-md-6 col-lg-4">
                  <img
                    src={animal.photo || backupImages[backupImageIndex].default}
                    alt={`Image for ${animal.name}`}
                    className="card-img-top card-v"
                  />
                  <div className="card-body">
                    <h2 className="card-title d-flex justify-content-center"><strong >{animal.name}</strong></h2>
                    <p className="card-text fs-5"><strong >Breed mixture: </strong>{animal.breeds ? animal.breeds.primary : 'N/A'}</p>
                    <p><strong>Size: </strong>{animal.size ? animal.size : 'N/A'}</p>
                    {/* <p><strong>City: </strong>{animal.city ? animal.city : 'N/A'}</p> */}
                    {/* <p ><strong>Animal Status: </strong>{animal.animal_status ? animal.animal_status : 'N/A'}</p> */}
                    {/* <p><strong>Color: </strong>{animal.color ? animal.color : 'N/A'}</p>
                    <p><strong>Descriptions: </strong>{animal.description ? animal.description : 'N/A'}</p>
                    <p><strong>City: </strong>{animal.contact ? animal.contact : 'N/A'}</p>
                    <p><strong>Contact: </strong>{animal.phone ? animal.phone : 'N/A'}</p> */}
                    <div className="mt-2 d-flex justify-content-center mb-2">
                    <Link to="/animal" state={animal} className="btn btn-success btn-lg"><strong>More details</strong></Link>
                  </div>
                  </div>
                </div>
              )))}
            {pets ? (
              filteredPets.map((animal, id) => (
                <div key={id} className="card rounded col-12 col-md-6 col-lg-4">
                  <img
                    src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${animal.id}/1/`}
                    onError={handleOnErrorImg}
                    alt={`Image for ${animal.name}`}
                    className="card-img-top card-v"
                  />
                  <div className="card-body">
                    <h4 className="card-title d-flex justify-content-center mb-3 "><strong>{animal.name}</strong></h4>
                    <p className="card-text fs-5"><strong>Breed mixture: </strong>{animal.breeds ? animal.breeds.primary : 'N/A'}</p>
                    <p className="card-text fs-4"><strong>Size: </strong>{animal.size ? animal.size : 'N/A'}</p>
                    <p className="card-text fs-4"><strong>Age: </strong>{animal.age ? animal.age : 'N/A'}</p>
                  <p className="card-text fs-4"><strong>Gender: </strong>{animal.gender ? animal.gender : 'N/A'}</p>
                  </div>
                  <div className="mt-2 d-flex justify-content-center mb-2">
                    <Link to="/animalapi" state={animal} className="btn btn-success btn-lg"><strong>More details</strong></Link>
                  </div>
                </div>
              ))
            ) : null}
          </Masonry>
        </div>
        </div>
      </div>
    </div>
  );
}
