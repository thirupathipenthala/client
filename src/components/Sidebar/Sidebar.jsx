import React from 'react';
import {Menu, MessageBox} from 'element-react';
import './Sidebar.css'
import { useHistory } from 'react-router';
const Sidebar = () => {
    const history = useHistory()
    return <>
        <Menu defaultActive="2" className="app-main-sidebar">
          <Menu.Item index="2"><i className="el-icon-upload2"></i>Firmware upload</Menu.Item>
          <Menu.Item index="3" >
            <div onClick={() => {

              MessageBox.msgbox({
                customClass: 'confirm-box',
                title: 'Message',
                message: 'Are you sure you want to exit the application?',
                showClose: false,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonClass: 'el-button--danger',
                cancelButtonClass: 'el-button--success',
                confirmButtonText: 'Exit'
              }).then(action => {
                if(action === 'confirm') {
                  localStorage.removeItem('jwt');
                  localStorage.removeItem('user');
                  history.push('/login');
                }
                
              })

            }}>
              <i className="el-icon-setting"></i>Sign Out
            </div>
          </Menu.Item>
        </Menu>
    </>
}

export default Sidebar;