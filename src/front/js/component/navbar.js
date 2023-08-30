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
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid text-center justify-content-center"> {/* Cambiado */}
                <div class="container">
                    <a class="navbar-brand" href="#">Home</a>
                    <a class="navbar-brand" href="#">Protectors</a>
                    <a class="navbar-brand" href="#">Match</a>
                    <button class="btn btn-outline-success" id="openSearchButton" onClick={toggleSearch}>
                        Open Search
                    </button>
                </div>
            </div>
            <div className={`container ${searchVisible ? "" : "d-none"}`} id="searchModalContent">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form action="https://petshelter.miwuki.com/busqueda-avanzada-protectoras" method="POST">
                            <div class="modal-header">
                                <h5 class="modal-title" id="searchModalLabel">Advanced search</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeSearch}></button>
                            </div>
                            <div class="modal-body">
                                <input type="hidden" name="_token" value="HmnY8nKjVRyXFWy9N95Gf0ftsuxgm8nz4NQKhTGS" />
                                <div class="row">
                                    <div class="col-md-5">
                                        <label class="form-label" for="fl_pais">Country</label>
                                        <select id="fl_pais" name="fl_pais" class="form-select">
                                            {/* Country options here */}
                                        </select>
                                    </div>
                                    <div class="col-md-7">
                                        <label class="form-label" for="fl_provincia">City</label>
                                        <select id="fl_provincia" name="fl_provincia" class="form-select" disabled>
                                            <option selected value="">City</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal" onClick={closeSearch}>Close</button>
                                <button
                                    type="submit"
                                    class="btn btn-primary"
                                    id="contactBtn"
                                    onClick={() => gtag('event', 'pet_shelters_filter', {'app_name': 'MPS_WEB'})}>
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
};
