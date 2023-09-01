import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const closeSearch = () => {
        setSearchVisible(false);
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
                                        <div className="col-md-5">
                                            <label className="form-label" htmlFor="fl_pais">Country</label>
                                            <select id="fl_pais" name="fl_pais" className="form-select">
                                                {/* Country options here */}
                                            </select>
                                        </div>
                                        <div className="col-md-7">
                                            <label className="form-label" htmlFor="fl_provincia">City</label>
                                            <select id="fl_provincia" name="fl_provincia" className="form-select" disabled>
                                                <option selected value="">City</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={closeSearch}>Close</button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        id="contactBtn"
                                        onClick={() => gtag('event', 'pet_shelters_filter', {'app_name': 'MPS_WEB'})}>
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
