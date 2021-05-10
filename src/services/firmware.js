import {MessageBox} from 'element-react';
/**
 * get group info details
 */
export const getGroupInfos = () => {
    return fetch(
        `/IOT_WEB_APP/rest/consumer/getGroupInfos`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
    ).then(res => res.json())

};

export const getDeviceList = (groupId) => {
    return fetch(`/IOT_WEB_APP/rest/consumer/getDevicesByGroupId/${groupId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}


export const getDeviceFirmware = (page = 1) => {
    return fetch(`${process.env.REACT_APP_API_PATH}/api/get-device-firmware?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const deleteFirmwareData = (id) => {
    return fetch(`${process.env.REACT_APP_API_PATH}/api/delete-device-firmware/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}
export const updateFirmwareData = (id) => {
    return fetch(`${process.env.REACT_APP_API_PATH}/api/update-device-firmware/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const viewFirmwareData = (id, page) => {
    return fetch(`${process.env.REACT_APP_API_PATH}/api/view-device-firmware/${id}?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const createFotaFirmware = (formData) => {
    return fetch(`${process.env.REACT_APP_API_PATH}/api/fota-Firmware-uplode`, {
        method: "post",
        headers: {
            // "Content-Type": "multipart/form-data"
        },
        body: formData
    }).
        then(res => res.json())
};



export const logout = (history) => {
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
}