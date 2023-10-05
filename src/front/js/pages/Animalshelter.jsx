import React, { useState, useContext, useEffect } from "react";
import ImgProtector from "../../img/protectoraicono.png";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/index.css";

export const Animalshelter = () => {
  const { store, actions } = useContext(Context);
  const [shelter, setShelter] = useState([]);
  const [shelterAPI, setShelterAPI] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const hostPetfinder = "https://api.petfinder.com/v2/";
  const url = hostPetfinder + "organizations/";

  const getShelter = async (token) => {
    const url = "https://api.petfinder.com/v2/organizations";
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: { Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setShelter(data.organizations);
    } else {
      console.log("error", response.status, response.statusText);
    }
  };

  useEffect(() => {
    actions.getProtectors();
    actions.fetchToken().then((token) => {
      if (token) {
        console.log(token);
        getShelter(token);
      }
    });
  }, []);

  const handleOnErrorImg = (e) => {
    const newBackupIndex = (backupImageIndex + 1) % backupImages.length;
    setBackupImageIndex(newBackupIndex);
    e.target.src = backupImages[newBackupIndex].default; // Usa .default para obtener la ruta de la imagen importada
  };

  const normalizeAPIShelter = () => {
    return shelter.map((item) => ({
      name: item.name,
      email: item.email,
      city: item.address.city,
      country: item.address.country,
      zip_code: item.address.postcode,
      state: item.address.state,
      phone: item.phone,
      web: item.url
      // Agrega más propiedades si es necesario...
    }));
  };

  // Combinar y normalizar las protectoras
  const combinedShelter = [...normalizeAPIShelter(), ...store.protectors];

  // Función para manejar el cambio en el dropdown de la ciudad seleccionada
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  // Filtrar las protectoras combinadas por ciudad
  const filteredShelter = combinedShelter.filter((item) => {
    const cityMatch = selectedCity === "" || item.city === selectedCity;
    const stateMatch = selectedState === "" || item.state === selectedState;
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
  
    return cityMatch && stateMatch && nameMatch;
  });
  
  return (
    <div className="container-fluid p-4 mb-3" >
      <h1 className="titulos text-center pt-4 mb-5 esmeralda">
        Find a Shelter: Animal Shelters and Rescues Near You
      </h1>
        {/* Dropdown para seleccionar la ciudad */}
        <div className="row d-flex justify-content-center p-5">
          <div className="col-md-3 px-0 pt-0 pb-0 card  border border-4 sombra rounded-2" style={{ maxHeight: "360px", overflowY: "auto" }}>
            <div className="leyendadifuminado card-header p-3 text-center" style={{width:"100%"}}>
              <h5 className="text-light"><b>Find faster here{"\u00A0"}{"\u00A0"}{"\u00A0"}<i className="fas fa-paw text-light"></i></b></h5>
            </div>
            <div className="card-body p-3" style={{ flex: "0 0 auto" }}>
              <div className="row d-flex justify-content-center mt-3">
                <div className="col-md-12 d-flex justify-content-center flex-column">
                  <label className="form-label"><b>Select a state</b></label>
                  <select
                    className="form-select "
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <option value="">All States</option>
                    {[...new Set(filteredShelter.map(item => item.state))]
                      .sort()
                      .map((state, id) => (
                        <option key={id} value={state}>
                          {state}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="form-label"><b>Select a city</b></label>
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">All Cities</option>
                  {[...new Set(filteredShelter.map(item => item.city))]
                  .sort() // Ordenar las ciudades alfabéticamente
                  .map((city, id) => (
                  <option key={id} value={city}>
                    {city}
                  </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table  table-striped table-hover border border-4" style={{ flex: "1" }}>
                <thead>
                  <tr className="text-center">
                    <th scope="col">PHOTO</th>
                    <th scope="col">ORGANIZATION</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">CITY</th>
                    <th scope="col">STATE</th>
                    <th scope="col">COUNTRY</th>
                    <th scope="col">POST CODE</th>
                    <th scope="col">PHONE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShelter.map((item, id) => (
                    <tr
                      className="text-center"
                      key={id}
                      onClick={() => window.open(item.web, "_blank")}
                    >
                      <td>
                        <a href={item.web} target="_blank" rel="noopener noreferrer">
                          <img
                            src={ImgProtector}
                            onError={handleOnErrorImg}
                            style={{ width: "60%" }}
                          />
                        </a>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
                      <td>{item.country}</td>
                      <td>{item.zip_code}</td>
                      <td>{item.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>  
          </div>
        </div>
    </div>
  );
};
