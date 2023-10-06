import React from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
const Nav = () => {

    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Navigate('/signup');
    }

    return (
        <div>
            <img 
            alt="logo" className="logo" src="https://cdn5.f-cdn.com/contestentries/54541/1674774/52d63b98a7291_thumb900.jpg"  />
            {auth ? <ul className="nav-ul">
                <li><Link to='/' >Products</Link></li>
                <li><Link to='/add' >Add Products</Link></li>
                <li><Link to='/update/' >Update Products</Link></li>
                <li><Link to='/profile' >Profile</Link></li>
                <li><Link onClick={logout} to='/logout' >Logout({JSON.parse(auth).name})</Link></li>

            </ul>
            :
                <ul className="nav-ul nav-right">
                    <li><Link to='/signup' >Sign up</Link></li>
                    <li><Link to='/login' >Login</Link></li>
                </ul>
            }
        </div>
    );
}

export default Nav;