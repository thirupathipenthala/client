import React from 'react'
import { useState, useEffect } from 'react'

const Fotaupload = () => {
    const [devicegroupdata, setDeviceGroupID] = useState({})
    const [groupid, setGroupId] = useState("")
    const [deviceGroup, setDeviceGroup] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    // `/IOT_WEB_APP/rest/consumer/getDevicesByGroupId/${60}`,

    const getGrouid = () => {
        fetch(`/IOT_WEB_APP/rest/consumer/getDevicesByGroupId/${groupid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(response => {
                setDeviceGroupID(JSON.stringify(response))
                console.log(" input :" + JSON.stringify(devicegroupdata))

            }).catch(error => console.log(error));
    }
    /*useEffect(() => {
        fetch(
            `/IOT_WEB_APP/rest/consumer/getDevicesByGroupId/${60}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => res.json())
            .then(response => {
                console.log(" getDevicesByGroupId :" + JSON.stringify(response))
                setDevice(response);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, []);*/
    useEffect(() => {
        fetch(
            `/IOT_WEB_APP/rest/consumer/getGroupInfos`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => res.json())
            .then(response => {
                console.log("getGroupInfos :" + JSON.stringify(response))
                setDeviceGroup(response);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, []);
    return (

        <div>

            <input
                type="text"
                placeholder="groupid"
                value={groupid}
                onChange={(e) => setGroupId(e.target.value)}
            />
            <button className=""
                onClick={() => getGrouid()}
            >
                Device Group
              </button>
        </div>

    )
}

export default Fotaupload