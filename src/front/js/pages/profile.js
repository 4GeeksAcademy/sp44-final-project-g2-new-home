import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

export const Profile = () => {
    const { actions, store } = useContext(Context);
    const [userData, setUserData] = useState({email: '', role: '', name: '', lastname: ''});

    // // Recupera el email del usuario del localStorage
    // const userEmail = localStorage.getItem("user_email");

    useEffect(() => {
        console.log("Valor de store.user_id:", store.user_id);
        console.log("Valor de store.token:", store.token);
        const token = store.token;
        const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user_data"));
        if (userDataFromLocalStorage) {
            setUserData(userDataFromLocalStorage);
        } else {
            actions.get_profile(store.user_id, token)
                .then(data => {
                    if (data) {
                        setUserData({ ...data }); // Asegúrate de que estás propagando todos los datos, incluidos los detalles de People
                        console.log("This is the data: ", data);
                        // Guarda userData en el localStorage para futuras recargas
                        localStorage.setItem("user_data", JSON.stringify(data));
                    } else {
                        console.log("ERROOOOOR NO SE PUDO OBTENER PERFIL")
                        setUserData({});
                    }
                });
        }
    }, [actions, store.user_id, store.token]);
    

    return (
        <div className="container mt-5">
          <h1 className="text-center">User Profile</h1>
          <div className="card mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-header">
              {userData.role === 'Person' && <h2>User nº: {userData.details.user_id}</h2>}
              {userData.role === 'AnimalShelter' && <h2>User nº: {userData.details.user_id}</h2>}
            </div>
            <div className="card-body">
              {userData && Object.keys(userData).length > 0 && (
                <div>
                  {userData.role === 'Person' && (
                    <div>
                      
                      <p>Name: {userData.details.name}</p>
                      <p>Last name: {userData.details.lastname}</p>
                      {userData.details.trophy && (
                        <p>
                            Trophy: <i className="fas fa-award"></i>
                        </p>
                       )}
                    </div>
                  )}
                  {userData.role === 'AnimalShelter' && (
                    <div>
                      <h3>Animal Shelter</h3>
                      <p>Email: {userData.email}</p>
                      <p>Role: {userData.role}</p>
                      <p>Name: {userData.details.name}</p>
                      <p>CIF: {userData.details.cif}</p>
                      <p>City: {userData.details.city}</p>
                      <p>Address: {userData.details.address}</p>
                      <p>Zip_code: {userData.details.zip_code}</p>
                      <p>Web: {userData.details.web}</p>
                      {/* Otros detalles específicos de protectora de animales */}
                    </div>
                  )}
                </div>
              )}
              {!userData && (
                <p>No se pudo cargar el perfil del usuario.</p>
              )}
            </div>
          </div>
        </div>
      );
      
};

