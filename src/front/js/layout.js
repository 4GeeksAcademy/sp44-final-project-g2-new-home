import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Tips } from "./pages/tips";

import { Adoptme } from "./pages/Adoptme.jsx";

import { Login } from "./pages/login";
import  Register   from "./pages/register";
import { Profile } from "./pages/profile";

import { Lostanimals } from "./pages/lostanimals";
import { VoluntaryForm } from "./pages/voluntaryform.js";
import { Experiences } from "./pages/experiences";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { DetailsPets } from "./pages/DetailsPets.jsx";

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
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Tips />} path="/tips" />                        
                        <Route element={<Lostanimals />} path="/lostanimals" />
                        <Route element={<VoluntaryForm />} path="/voluntaryform" /> 
                        <Route element={<Experiences />} path="/experiences" />   
                        <Route element={<Single />} path="/single" />
                        <Route element={<Adoptme />} path="/adoptme" />
                        {/* <Route element={<DetailsPets />} path="/adoptme/:id" /> */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
