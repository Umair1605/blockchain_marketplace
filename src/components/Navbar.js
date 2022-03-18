import React  from 'react';
import "./Navbar.css"
const Navbar =({user,updateUser})=>{

    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
            >
                MARKETPLACE
            </a>
            <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white"><span id="account">{user.name}</span></small>
                
            </li>
            <button onClick={()=>updateUser({})} > Logout</button>
            </ul>
            
        </nav>
    );
  }

export default Navbar;
