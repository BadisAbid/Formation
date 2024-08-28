import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/admin_assets/assets';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-options'>

            <NavLink to= '/add' className='sidebar-option'>
            <img className='logo'src={assets.add_icon} alt="logo"/>
            <p>Ajouter des formations </p>
            </NavLink>

            <NavLink to='/list' className='sidebar-option'>
            <img className='logo-list'src={assets.list_icon} alt="logo"/>
            <p>Èlément de liste </p>
            </NavLink>

            <NavLink to='/orders' className='sidebar-option'>
            <img className='logo'src={assets.order_icon} alt="logo"/>
            <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
