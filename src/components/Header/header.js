import React from 'react';
import FormSearch from "../FormSearch/formSearch";
import {Link} from "react-router-dom";
const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/adminPanel"}>Термини</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/rooms"}>Простории</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className={"nav-link"} to={"/consultations/add"}>Додади термин</Link>
                        </li>
                    </ul>
                    <FormSearch onSearch={props.onSearch}/>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                        <Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>
                    </form>

                </div>
            </nav>
        </header>
    )
}
export default Header;
