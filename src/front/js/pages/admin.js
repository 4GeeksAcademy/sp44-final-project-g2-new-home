import React, { useEffect, useContext } from "react";
import { Context } from '../store/appContext';


export const Admin = () => {
  const { actions, store } = useContext(Context);

  const handleDelete = async (userId, volunterId, experienceId, animalId) => {
    // try {
    //   // Buscar el usuario actual en la lista de usuarios del store
    //   const currentUser = store.users.find(user => user.id === userId);
  
    //   if (currentUser) {
    //     if (currentUser.role === 'Person') {
    //       // Verificar si hay un registro en la tabla Volunteer
    //       const hasVolunteer = await actions.getVolunteers(volunterId);
  
    //       if (hasVolunteer) {
    //         // Si existe un registro en la tabla Volunteer, eliminarlo primero
    //         await actions.deleteVolunteer(volunterId);
    //       } else {
    //         // Si no existe un registro en la tabla Volunteer, verificar ExperiencesBlog
    //         const hasExperiences = await actions.get_experiences(experienceId);
  
    //         if (hasExperiences) {
    //           // Si hay registros en ExperiencesBlog, eliminarlos primero
    //           await actions.delete_experience(experienceId);
    //         }
  
    //         // Verificar si hay animales asociados a este usuario
    //         const hasAnimals = await actions.get_shelter_animals(animalId);
  
    //         if (hasAnimals) {
    //           // Si hay animales asociados, eliminarlos primero
    //           await actions.delete_animal(animalId);
    //         }
    //       }
    //     } else if (currentUser.role === 'AnimalShelter') {
    //       // Verificar si hay animales asociados a este refugio
    //       const hasAnimals = await actions.get_shelter_animals(animalId);
  
    //       if (hasAnimals) {
    //         // Si hay animales asociados, eliminarlos primero
    //         await actions.delete_animal(animalId);
    //       }
    //     }
  
    //     // Finalmente, eliminar el usuario
    //     const result = await actions.deleteUser(userId);
  
    //     if (result.success) {
    //       // Actualizar la lista de usuarios después de una eliminación exitosa
    //       actions.getUsers();
    //       alert("Usuario eliminado exitosamente");
    //     } else {
    //       alert("Error al eliminar el usuario: " + result.message);
    //     }
    //   } else {
    //     alert("No se pudo encontrar el usuario en la lista.");
    //   }
    // } catch (error) {
    //   console.error("Error al eliminar el usuario:", error);
    //   alert("Ha ocurrido un error al eliminar el usuario");
    // }
  };

  const handleUpdateIsActive = async (userId) => {
    // Determine whether to activate or deactivate based on the user's current isActive status
    const userToUpdate = store.users.find((user) => user.id === userId);
    const newIsActive = !userToUpdate.is_active; // Toggle the isActive status
  
    const userData = {
      id: userId,
      is_active: newIsActive,
    };
  
    const response = await actions.update_profile(userData);
  
    if (response.success) {
      // La actualización fue exitosa, puedes realizar alguna acción adicional si es necesario
      console.log("Perfil actualizado exitosamente");
    } else {
      // Hubo un error en la actualización, puedes manejarlo de acuerdo a tus necesidades
      console.error("Error al actualizar el perfil:", response.message);
    }
  };
  
  

  useEffect(() => {
    // Llama a la función getUsers() del contexto para obtener la lista de usuarios
    actions.getUsers();
  }, []); // El segundo argumento vacío asegura que esta función se ejecute solo una vez al montar el componente

  return (
    <div className="container w-50">
      <h2 className="mb-4">List of Users</h2>
      {/* Mapea store.users para mostrar la lista de usuarios */}
      <ul className="list-group custom-list">
        {store.users.map((user) => (
          <li className="list-group-item custom-list-item mb-3" key={user.user_id}>
            <h4 className="mb-3">Email: {user.email}</h4>
            <p><strong>Role:</strong> {user.role}</p>

            {user.role === "Person" && (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Last Name:</strong> {user.lastname}</p>
              </>
            )}
            {user.role === "AnimalShelter" && (
              <>
                <p><strong>CIF:</strong> {user.cif}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Zip Code:</strong> {user.zip_code}</p>
                <p><strong>Web:</strong> <a href={user.web} target="_blank" rel="noopener noreferrer">{user.web}</a></p>
              </>
            )}
            {/* {user.is_active == true ? (
              <button
                className="btn btn-danger me-3"
                style={{ width: "180px" }}
                onClick={() => {
                  handleUpdateIsActive(user.id);
                }}
              >
                Desactivate Account
              </button>
            ) : (
              <button
                className="btn btn-success me-3"
                style={{ width: "180px" }}
                onClick={() => {
                  handleUpdateIsActive(user.id);
                }}
              >
                Activate Account
              </button>
            )} */}
            {/* <button
              className="btn btn-danger"
              onClick={() => handleDelete(user.id, user.volunterId, user.experienceId, user.animalId)}
            >
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
