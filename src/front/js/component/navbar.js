import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [cityFilter, setCityFilter] = useState("");
    const cities = [
        "Madrid",
        "Barcelona",
        "Valencia",
        "Sevilla",
        "Zaragoza",
        "Bilbao",
        // Agrega más ciudades según tus necesidades
    ];

    const [searchHistory, setSearchHistory] = useState([]); // Historial de búsquedas

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const closeSearch = () => {
        setSearchVisible(false);
    };

    const filteredCities = cities
        .filter(city =>
            city.toLowerCase().startsWith(cityFilter.toLowerCase())
        )
        .filter(city =>
            !searchHistory.includes(city.toLowerCase())
        );

    const handleSearch = () => {
        setSearchHistory([...searchHistory, cityFilter.toLowerCase()]);
        // Aquí puedes realizar la acción de búsqueda
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid text-center justify-content-center">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="nav-links">
                        <a className="navbar-brand" href="/">Home</a>
                        <a className="navbar-brand" href="protectors">Protectors</a>
                        <a className="navbar-brand" href="tips">Tips</a>
                        <a className="navbar-brand" href="lostanimals">Lost animals</a>
                        <a className="navbar-brand" href="voluntaryform">Voluntary form</a>
                        <a className="navbar-brand" href="experiences">Experiences</a>
                    </div>
                    <button className="btn btn-outline-success" id="openSearchButton" onClick={toggleSearch}>
                        Open Search
                    </button>
                </div>
            </div>
            {searchVisible && (
                <div className="search-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form action="https://petshelter.miwuki.com/busqueda-avanzada-protectoras" method="POST">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="searchModalLabel">Advanced search</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeSearch}></button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" name="_token" value="HmnY8nKjVRyXFWy9N95Gf0ftsuxgm8nz4NQKhTGS" />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="form-label ms-2" htmlFor="City"><b>City</b></label>
                                            <input
                                                type="text"
                                                id="City"
                                                name="City"
                                                className="form-control"
                                                placeholder="Enter a city"
                                                list="citySuggestions" 
                                                value={cityFilter}
                                                onChange={(e) => {
                                                    setCityFilter(e.target.value);
                                                }}
                                            />
                                            <datalist id="citySuggestions">
                                                {filteredCities.map((city, index) => (
                                                    <option key={index} value={city} />
                                                ))}
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={closeSearch}>Close</button>
                                    <button
                                        type="button" // Cambiado de submit a button
                                        className="btn btn-primary"
                                        id="contactBtn"
                                        onClick={() => {
                                            handleSearch();
                                            closeSearch();
                                        }}
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
