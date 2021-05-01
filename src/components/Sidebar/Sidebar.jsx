import React from 'react';
import {Menu} from 'element-react';
import './Sidebar.css'
const Sidebar = () => {
    return <>
        <Menu defaultActive="2" className="app-main-sidebar">
          
          <Menu.Item index="2"><i className="el-icon-upload2"></i>Firmware upload</Menu.Item>
          <Menu.Item index="3"><i className="el-icon-setting"></i>Sign Out</Menu.Item>
        </Menu>
    </>
}

export default Sidebar;