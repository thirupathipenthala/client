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