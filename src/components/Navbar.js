import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to="/" className="brand-logo left">Instagram</Link>
                <li><Link to="/Signin">Signin</Link></li>,
                 <li><Link to="/Signup">Signup</Link></li>
                <li><Link to="/Fotaupload">fotaupload</Link></li>
            </div>
        </nav>
    )
}

export default NavBar