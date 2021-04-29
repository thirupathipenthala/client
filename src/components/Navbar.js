import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <nav>
            <div >
                <Link to="/">Instagram</Link>,
               <Link to="/Signin">Signin</Link>,
                 <Link to="/Signup">Signup</Link>,
                <Link to="/Fotaupload">Fotaupload</Link>


            </div>
        </nav>
    )
}

export default NavBar