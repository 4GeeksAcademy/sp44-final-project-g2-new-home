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

  // Filtrar las protectoras combinadas por ciudad
  const filteredShelter = combinedShelter.filter((item) => {
    if (selectedCity === "") {
      return true; // Mostrar todas las protectoras si no se ha seleccionado una ciudad
    } else {
      return item.city === selectedCity;
    }
  });

  return (
    <div className="container mb-3">
      <h1 className="titulos text-right pt-4 mb-5">
        Find a Shelter: Animal Shelters and Rescues Near You
      </h1>
      {/* Dropdown para seleccionar la ciudad */}
      <div className="d-flex">
        <div className=" me-5" style={{ flex: "0 0 auto" }}>
          <p><b>Select a city</b></p>
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
        {/* Tabla */}
        <table className="table table-striped table-hover border border-4" style={{ flex: "1" }}>
          <thead>
            <tr className="text-center custom-row">
              <th scope="col">WEBSITE</th>
              <th scope="col">ORGANIZATION</th>
              <th scope="col">EMAIL</th>
              <th scope="col">CITY</th>
              <th scope="col">STATE/PROV</th>
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
  );
};
