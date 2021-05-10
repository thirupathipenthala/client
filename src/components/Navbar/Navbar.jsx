import React from 'react'
import './Navbar.css';
import {Menu} from 'element-react';
import { useHistory } from 'react-router';
import { logout } from '../../services/firmware';
const NavBar = (props) => {
    const history = useHistory();
    return (
        <Menu theme="dark" className="app-main-nav" mode="horizontal">
            <Menu.Item index="1">
                <img src="/images/colorLogo.png" className="main-logo" alt="logo"/>
            </Menu.Item>

            <Menu.SubMenu index="2" title={<>
                <img className="user-icon" src="/images/user.png" />
                &nbsp;
                &nbsp;
                <span>{props.user.data.uname}</span>
            </>}>
                <Menu.Item index="2-3" >
                    <div onClick={() => {
                    logout(history)
                }}>
                    Sign Out
                    </div>
                </Menu.Item>
            </Menu.SubMenu>
            
      </Menu>
    )
}

export default NavBar