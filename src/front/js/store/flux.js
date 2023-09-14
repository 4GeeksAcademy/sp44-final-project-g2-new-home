const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token"),
			message: null,
			favorite: [],
			user_id: null,
			user_email: localStorage.getItem("user_email"),

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			register: async (email, password, isActive, userType, name, lastname, cif, address, city, zipCode, web) => {
				const userData = {
					email: email,
					password: password,
					is_active: isActive,
					role: userType,
					name: name,
					lastname: lastname,
					cif : cif,
					address : address,
					city : city,
					zip_code : zipCode,
					web : web
				  };
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(userData)
				};
				
				try {
				  const resp = await fetch(process.env.BACKEND_URL + "/api/users", opts);
				  if (resp.status !== 200) {
					alert("There has been some error");
					return false;
				  }
				  const data = await resp.json();
				  console.log("Registration successful", data);
				  // Aquí redirijo a login
				  return true;
				} catch (error) {
				  console.error("Error during registration", error);
				  return false;
				}
			},
			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers:{
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				} 
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", opts)
					if(resp.status !== 200) {
					alert("There has been some error")
					return false
					}
					const data = await resp.json()		
					console.log("User ID:", data.user_id); // Imprime el ID del usuario
					console.log("User Email:", data.user_email); 
					localStorage.setItem("token", data.access_token)
					setStore({ token: data.access_token, user_id: data.user_id, user_email: data.user_email }); // Almacena el ID del usuario en el store
					console.log("This came from the backend", data)
					console.log("Token:", data.access_token);
					return true
				}
				catch(error){console.error("There has been an error login in")}	
			},
			sync_token_from_local_storage: () => {
				const token = localStorage.getItem("token")
				console.log("You are login out successfully!!!!!!!!")
				if(token && token != "" && token != undefined) setStore({token: token})
			},
			logout: () => {
				setStore({ message: "" })
				localStorage.clear()
				console.log("APlication just loaded synching the local Storage Token")
				setStore({token: null}) 
			},
			get_profile: async (userId) => {
				console.log('getUserProfile llamado con userId:', userId);
				const token = getStore().token;
			
				if (!token || !userId) {
					// Manejar el caso en el que el token o el userId no estén disponibles
					return null;
				}
			
				const requestOptions = {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`
					}
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/users/${userId}`, requestOptions);
					if (response.status === 200) {
						const data = await response.json();
						return data.results; // Devuelve los datos del perfil del usuario
					} else {
						// Manejar el caso en el que la solicitud no sea exitosa
						return null;
					}
				} catch (error) {
					// Manejar errores de red u otros errores
					console.error('Error fetching user profile:', error);
					return null;
				}
			},
			update_profile: async (userData) => {
				console.log('update_profile llamado con userData:', userData);
				let token = localStorage.getItem("token");
				console.log('user_id en userData:', userData.user_id);

				if (!token) {
				  // Manejar el caso en que el token no esté disponible
				  return { success: false, message: "Token de autenticación no disponible" };
				}
			  
				const requestOptions = {
				  method: 'PUT',
				  headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json', // Agregar el encabezado de tipo de contenido JSON
				  },
				  body: JSON.stringify(userData), // Envía todo el objeto userData
				};
				console.log("ESTE ES EL BODY",userData)
				try {
				  const response = await fetch(process.env.BACKEND_URL + `/api/users/${userData.id}`, requestOptions);
				  if (response.status === 200) {
					const data = await response.json();
					console.log("ESTO ES EL DATA EL RESPJSON", data)
					setStore({ user_email : userData.email });
					localStorage.setItem("user_email", userData.email);
					return { success: true, message: "Perfil actualizado exitosamente", data };
				  } else {
					// Manejar el caso en que la solicitud no sea exitosa
					return { success: false, message: "No se pudo actualizar el perfil" };
				  }
				} catch (error) {
				  // Manejar errores de red u otros errores
				  console.error('Error updating user profile:', error);
				  return { success: false, message: "Error al actualizar el perfil" };
				}
			},
			volunteer: async (address, city, zipCode, phone, email, description, availability, peopleId) =>{
							const volunteerData = {
								address: address,
								city: city,
								zipCode: zipCode,
								phone: phone,
								email: email,
								description: description,
								availability: availability,
								peopleId: peopleId
							};
							const opts = {
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify(volunteerData)
							};
							try {
								const resp = await fetch(process.env.BACKEND_URL + "/api/volunteer", opts);
								if (resp.status !== 200) {
								  alert("There has been some error");
								  return false;
								}
								const data = await resp.json();
								console.log("Volunteer registration successfully completed", data);
								// Aquí redirijo a login
								return true;
							  } catch (error) {
								console.error("Error during volunteer registration", error);
								return false;
							  }
			},


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			// getPets: async() => {
			// 	if(localStorage.getItem('petsLocal') !== null){
			// 	} else {
			// 		const response = await fetch('https://api.petfinder.com/v2/types/dog');
			// 		if(response.ok) {
			// 			const data = await response.json();
			// 			localStorage.setItem('petsLocal', JSON.stringify(data.results));
			// 		} else {
			// 			console.log('error:', response.status, response.statusText)
			// 		}
			// 	}
			// },

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
