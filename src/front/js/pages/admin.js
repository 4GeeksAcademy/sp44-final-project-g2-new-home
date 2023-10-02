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

 // Función de comparación para ordenar alfabéticamente por correo electrónico
 const compareByEmail = (a, b) => {
  const emailA = a.email.toUpperCase();
  const emailB = b.email.toUpperCase();

  if (emailA < emailB) {
    return -1;
  }

  if (emailA > emailB) {
    return 1;
  }

  return 0;
};

// Ordenar la lista de usuarios por correo electrónico
const sortedUsers = [...store.users].sort(compareByEmail);

// Encontrar el índice del usuario "admin" en la lista ordenada
const adminIndex = sortedUsers.findIndex((user) => user.role === "admin");

// Mover el usuario "admin" al principio de la lista
if (adminIndex !== -1) {
  sortedUsers.splice(adminIndex, 1); // Elimina el usuario "admin" de su posición original
  sortedUsers.unshift(store.users[adminIndex]); // Agrega el usuario "admin" al principio de la lista
}

// const handleToggleActiveClick = () => {
            
//   // Cambia el valor de is_active en el estado local
//   const desactivateId = user.id;
   
//   actions.delete_profile(desactivateId)
//       .then(response => {
//           if (response.success) {
//               alert("Account successfully deactivated"); 
//           } else {
//               // Maneja el caso de error en la actualización
//               alert(response.message);
//           }
//       })
//       .catch(error => {
//           // Maneja errores de red u otros errores
//           console.error('Error updating user active status:', error);
//       });
// };


return (
  <div className="container mb-3">
    <h1 className="titulos text-center pt-4 mb-5 esmeralda">List of Users</h1>
    <table className="table table-striped border border-4 text-center">
      <thead>
        <tr className="text-center custom-row">
          <th scope="col">EMAIL</th>
          <th scope="col">ROLE</th>
          <th scope="col">NAME</th>
          <th scope="col">LAST NAME</th>
          <th scope="col">CIF</th>
          <th scope="col">CITY</th>
          <th scope="col">ADDRESS</th>
          <th scope="col">ZIP CODE</th>
          <th scope="col">WEB</th>
          <th scope="col">DEACTIVATE ACCOUNT</th> 
        </tr>
      </thead>
      <tbody>
  {sortedUsers.map((user) => (
    <tr className="text-center" key={user.user_id}>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.name || "/"}</td>
      <td>{user.lastname || "/"}</td>
      <td>{user.cif || "/"}</td>
      <td>{user.city || "/"}</td>
      <td>{user.address || "/"}</td>
      <td>{user.zip_code || "/"}</td>
      <td>
        {user.web ? (
          <a href={user.web} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe text-primary" title={user.web}></i>
          </a>
        ) : (
          "/"
        )}
      </td>
      <td>
        <button
          className="btn btn-transparent me-3"
          onClick={() => {
            handleToggleActiveClick();
          }}
        >
          {user.is_active ? (
            <i className="fas fa-user" style={{ color: "#db0606" }}></i>
          ) : (
            <i className="fas fa-user-slash" style={{ color: "#ff0a3b" }}></i>
          )}
        </button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
  </div>
);
};