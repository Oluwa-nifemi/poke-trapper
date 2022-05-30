import React from 'react';
import {Link, Outlet} from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <>
            <nav>
                <h3>
                    Poke trapper
                </h3>
                <ul>
                    <li>
                        <Link to="/">List</Link>
                    </li>
                    <li>
                        <Link to="/2">Deets</Link>
                    </li>
                    <li>
                        <Link to="/my-pokemon">My precious </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default Layout;