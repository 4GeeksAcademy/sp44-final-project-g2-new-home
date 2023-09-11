const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			user_id: null,
			user_mail: null,
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
				const token = localStorage.removeItem("token")
				localStorage.removeItem("user_data")
				localStorage.removeItem("user_email")
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
