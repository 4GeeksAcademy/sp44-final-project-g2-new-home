import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Tips } from "./pages/tips";

import { Adoptme } from "./pages/Adoptme.jsx";
import { Details } from "./pages/details";
import { Detailsdb } from "./pages/Detailsdb.jsx";
import { Animalshelter } from "./pages/Animalshelter.jsx";

import { Login } from "./pages/login";
import  Register   from "./pages/register";
import { Profile } from "./pages/profile";
import UploadAnimal from "./pages/uploadanimal";

import { Lostanimals } from "./pages/lostanimals";
import { VoluntaryForm } from "./pages/voluntaryform.js";
import { Experiences } from "./pages/experiences";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Admin } from "./pages/admin";
import { Policy } from "./pages/policy";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Tips />} path="/tips" />
                        <Route element={<Admin />} path="/users" />
                        <Route element={<Policy />} path="/policy" />
                        <Route element={<UploadAnimal />} path="/animals" />                        
                        <Route element={<Lostanimals />} path="/lostanimals" />
                        <Route element={<VoluntaryForm />} path="/voluntaryform" /> 
                        <Route element={<Experiences />} path="/experiences" />   
                        <Route element={<Single />} path="/single" />
                        <Route element={<Adoptme />} path="/adoptme" />
                        <Route element={<Details />} path="/animalapi" />
                        <Route element={<Detailsdb />} path="/animal" />
                        <Route element={<Animalshelter />} path="/animalshelter" />
                       <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
