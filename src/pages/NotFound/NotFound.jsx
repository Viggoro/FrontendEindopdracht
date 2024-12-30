import React from 'react';
import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <main className="page-container">
            <h1 className="content-container-center lowered-text">
                Sorry... Page Not Found
            </h1>
            <p className="content-container-center">
                Take me back to the <Link to="/">home page</Link>
            </p>

        </main>
    );
}

export default NotFound;