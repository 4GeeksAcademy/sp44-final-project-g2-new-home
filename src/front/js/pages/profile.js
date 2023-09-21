import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";



export const Profile = () => {
    const { actions, store } = useContext(Context);
    const [userData, setUserData] = useState({ email: '', role: '', details: {} }); // Inicializa details como un objeto vacío
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e, field) => {
      
        console.log(`handleInputChange called with field: ${field}`);
        
        // Maneja los cambios en los campos editables aquí
        if (field === 'email') {
          // Maneja el campo de correo electrónico de manera diferente
          setUserData({
              ...userData,
              email: e.target.value,
          });
      } else {
          // Maneja los cambios en otros campos editables dentro de 'details'
          setUserData({
              ...userData,
              details: {
                  ...userData.details,
                  [field]: e.target.value,
              },
          });
      }
      };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Datos de userData antes de enviar:', userData);
        // Envía los datos editados al servidor aquí, por ejemplo, usando una función de acción de tu contexto
        const updatedData = {
            ...userData,
            // user_id: store.user_id, 
        };
        console.log('Datos actualizados antes de la solicitud PUT:', userData);
        actions.update_profile(userData);
        localStorage.setItem("user_data", JSON.stringify(userData));
        
        setIsEditing(false);
    };

    const handleUnsubscribe = () => {
        const confirmDelete = window.confirm("¿Seguro que desea darse de baja? Esta acción no se puede deshacer.");
        if (confirmDelete) {
            actions.unsubscribe_user(store.user_id); // Llama a la función que eliminará al usuario
        }
    };

    const handleToggleActiveClick = () => {
            
        // Cambia el valor de is_active en el estado local
        const desactivateId = userData.id;
         
        actions.delete_profile(desactivateId)
            .then(response => {
                if (response.success) {
                    actions.logout()
                    navigate("/");
                    alert(response.message); // Puedes mostrar un mensaje de éxito
                } else {
                    // Maneja el caso de error en la actualización
                    alert(response.message);
                }
            })
            .catch(error => {
                // Maneja errores de red u otros errores
                console.error('Error updating user active status:', error);
            });
    };
    
    

    useEffect(() => {
        const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user_data"));
        let user_id = localStorage.getItem("user_id")
        let token = localStorage.getItem("token")
        if (!user_id && !token){
            user_id = store.user_id
            token = store.token
        }
        console.log("Valor de store.user_id:", store.user_id);
        console.log("Valor de store.token:", store.token);
        if (userDataFromLocalStorage) {
            setUserData(userDataFromLocalStorage);
        } else {
            actions.get_profile(user_id, token)
                .then(data => {
                    if (data) {
                        setUserData({ ...data }); // Asegúrate de que estás propagando todos los datos, incluidos los detalles de People
                        console.log("This is the data: ", data);
                        // Guarda userData en el localStorage para futuras recargas
                        localStorage.setItem("user_data", JSON.stringify(data));
                    } else {
                        console.log("ERROOOOOR NO SE PUDO OBTENER PERFIL")
                        setUserData({ email: '', role: '', details: {} }); // Establece un objeto vacío en caso de error
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
                  {isEditing ? (
                      <form onSubmit={handleFormSubmit}>
                          {/* Agrega campos editables aquí, por ejemplo: */}
                          {userData.role === 'Person' && (
                            <div>
                              <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email:</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="email"
                                      value={userData.email}
                                      onChange={(e) => handleInputChange(e, 'email')}
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Name:</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      value={userData.details.name}
                                      onChange={(e) => handleInputChange(e, 'name')}
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="lastname" className="form-label">Last Name:</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="lastname"
                                      value={userData.details.lastname}
                                      onChange={(e) => handleInputChange(e, 'lastname')}
                                  />
                              </div>
                            </div>
                          )}
                          {userData.role === 'AnimalShelter' && (
                              <div>
                                  <div className="mb-3">
                                      <label htmlFor="email" className="form-label">Email:</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="email"
                                          value={userData.email}
                                          onChange={(e) => handleInputChange(e, 'email')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Name:</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      value={userData.details.name}
                                      onChange={(e) => handleInputChange(e, 'name')}
                                  />
                              </div>
                                  <div className="mb-3">
                                      <label htmlFor="cif" className="form-label">CIF:</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="cif"
                                          value={userData.details.cif}
                                          onChange={(e) => handleInputChange(e, 'cif')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="address" className="form-label">Address:</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="address"
                                          value={userData.details.address}
                                          onChange={(e) => handleInputChange(e, 'address')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="zip_code" className="form-label">Zip Code:</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="zip_code"
                                          value={userData.details.zip_code}
                                          onChange={(e) => handleInputChange(e, 'zip_code')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="city" className="form-label">City:</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="city"
                                          value={userData.details.city}
                                          onChange={(e) => handleInputChange(e, 'city')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="web" className="form-label">Web:</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="web"
                                          value={userData.details.web}
                                          onChange={(e) => handleInputChange(e, 'web')}
                                      />
                                  </div>
                              </div>
                          )}
                          <button type="submit" className="btn btn-primary me-3">Save</button>
                          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                      </form>
                  ) : (
                    <div>
                        {/* Mostrar datos no editables aquí */}
                        <p>Email: {userData.email}</p>
                        <p>Role: {userData.role}</p>
                        {userData.role === 'Person' && (
                            <>
                                <p>Name: {userData.details.name}</p>
                                <p>Last name: {userData.details.lastname}</p>
                            </>
                        )}
                        {userData.role === 'AnimalShelter' && (
                            <>
                                <p>Name: {userData.details.name}</p>
                                <p>CIF: {userData.details.cif}</p>
                                <p>City: {userData.details.city}</p>
                                <p>Address: {userData.details.address}</p>
                                <p>Zip_code: {userData.details.zip_code}</p>
                                <p>Web: {userData.details.web}</p>
                                {/* Otros detalles específicos de protectora de animales */}
                            </>
                        )}
                        {userData.details.trophy && (
                            <p>
                                Trophy: <i className="fas fa-award"></i>
                            </p>
                        )}
                        <button onClick={handleEditClick} className="btn btn-primary">Edit Profile</button>
                        {/* <button onClick={handleUnsubscribe} className="btn btn-primary ms-3">Unsubscribe</button> */}
                        <button onClick={handleToggleActiveClick} className="btn btn-primary ms-3">
                           'Desactivate account'
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
