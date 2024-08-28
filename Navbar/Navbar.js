import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Accueil");
  const { calculateTotalPrice,token,setToken } = useContext(StoreContext);
const navigate = useNavigate();
// logout function
const logout=()=>{
  localStorage.removeItem("token");
  setToken(""); //token twalli fer8a
  // kif el user logout nhezzouh lel home page 
  navigate("/");
}
 

  return (
    <div className='navbar' id='navbar'>
      <Link to="/"><img src={assets.logo} alt="logo" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("Accueil")} className={menu === "Accueil" ? "active" : ""}>Accueil</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("Application-mobile")} className={menu === "Application-mobile" ? "active" : ""}>Application-mobile</a>
        <a href='#footer' onClick={() => setMenu("Contactez-nous")} className={menu === "Contactez-nous" ? "active" : ""}>Contactez-nous</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-search-icon">
          <Link to='/Cart'><img src={assets.basket_icon} alt="basket_icon" /></Link>
        {/* fazet kifeh bech yaffichi el dot el 7amra */}
         <div className={calculateTotalPrice()===0?"":"dot"}></div>

        </div>
       {/* itha kén token mahich mawjoud fil local storage yaffichi sign in button */}
  {!token?<button onClick={() => setShowLogin(true)}>Sign in</button>:
             <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="profile_icon" />
                <ul className='nav-profile-dropdown'>
                  <li> <img src={assets.bag_icon} alt="bag_icon" /><p>Orders</p></li>
                    <hr/>
                    <li onClick={logout}><img src={assets.logout_icon} alt="logout_icon" />Logout</li>
               </ul>
           </div>
  }
        
      </div>
    </div>
  );
}

export default Navbar;
