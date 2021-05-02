import React from 'react'
import './Navbar.css';
import {Menu} from 'element-react';
const NavBar = () => {
    return (
        <Menu theme="dark" className="app-main-nav" mode="horizontal">
            <Menu.Item index="1">
                <img src="/images/colorLogo.png" className="main-logo" alt="logo"/>
            </Menu.Item>

            <Menu.SubMenu index="2" title={<>
                <img className="user-icon" src="/images/user.png" />
                &nbsp;
                &nbsp;
                <span>Username</span>
            </>}>
                <Menu.Item index="2-1">Option 1</Menu.Item>
                <Menu.Item index="2-2">Option 2</Menu.Item>
                <Menu.Item index="2-3">Option 3</Menu.Item>
            </Menu.SubMenu>
            
      </Menu>
    )
}

export default NavBar