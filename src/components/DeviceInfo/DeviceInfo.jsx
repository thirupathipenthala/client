import React, { useState, useCallback, useEffect } from 'react';
import { Table, Pagination, Loading } from 'element-react';
import { viewFirmwareData } from '../../services/firmware';
const columns = [
    {
        label: "Device SerialNo",
        prop: "serialNo"
    },
    {
        label: "Device Type",
        prop: "devType"
    },
    {
        label: "Device Status",
        prop: "status"
    }
];

const DeviceInfo = (props) => {
    const [page, updatePage] = useState(1);
    const [loading, updateLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const viewFirmware = useCallback((page) => {
        updateLoading(true);
        viewFirmwareData(props.data.id, page)
            .then(response => {
                setResponse(response)
            })
            .catch(error => console.log(error))
            .finally(() => {
                updateLoading(false);
            })
    },[props])

    useEffect(() => {
        viewFirmware(page);
    },[page])
    if(response === null) {
        return <>Loading...</>
    }
    return <>
        <Loading loading={loading} text="Loading...">
            {response.data.length != 0 ? <>
                <h3>Group Name: {response.data[0].group_name}</h3>
                <h3>File checksum: {props.data.checksum}</h3>
                <div>
                    <Table columns={columns} data={response.data} />
                </div>
                <div style={{marginTop: '10px', textAlign: 'right'}}>
                <Pagination layout="prev, pager, next" total={response.total} small={true} onCurrentChange={(v) => {
                    updatePage(v)
                }}/>
                </div> 
            </> : <>No Data</> }
        </Loading>
    </>
}

export default DeviceInfo;