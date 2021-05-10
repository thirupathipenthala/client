import React from 'react';
import {Menu} from 'element-react';
import './Sidebar.css'
import { useHistory } from 'react-router';
import { logout } from '../../services/firmware';
const Sidebar = () => {
    const history = useHistory()
    return <>
        <Menu defaultActive="2" className="app-main-sidebar">
          <Menu.Item index="2"><i className="el-icon-upload2"></i>Firmware upload</Menu.Item>
          <Menu.Item index="3" >
            <div onClick={() => {
              logout(history)
            }}>
              <i className="el-icon-setting"></i>Sign Out
            </div>
          </Menu.Item>
        </Menu>
    </>
}

export default Sidebar;