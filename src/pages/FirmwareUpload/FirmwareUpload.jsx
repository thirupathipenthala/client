import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import { Layout, Card, Select, Input, Table, Pagination, Button, Loading, Checkbox, MessageBox, Form } from 'element-react';
import './FirmwareUpload.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getGroupInfos, getDeviceList, getDeviceFirmware, deleteFirmwareData, createFotaFirmware, updateFirmwareData } from '../../services/firmware';
import DeviceInfo from '../../components/DeviceInfo/DeviceInfo';

const FirmwareUpload = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [deviceGroup, setDeviceGroup] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [firmwareList, setFirmwareList] = useState([]);

    const [page, updatePage] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedGroup, updateSelectedGroup] = useState(null);
    const [selectedDeviceList, updateSelectedDeviceList] = useState([]);
    const [formData, updateFormData] = useState({});
    const [role, updateRole] = useState('')
    const formRef = useRef(null)

    useEffect(() => {
        /**
         * get group info, get device firmware
         */
        Promise.all([getGroupInfos(), getDeviceFirmware(1)])
            .then(response => {
                setDeviceGroup(response[0].resultant);
                setFirmwareList(response[1].data);
                setTotal(response[1].total);
                updateRole(JSON.parse(localStorage.getItem('user')));

            })
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false);
            })
    }, [])


    useEffect(() => {
        if (selectedGroup) {
            setIsLoading(true);
            getDeviceList(selectedGroup).then(response => {
                setDeviceList(response.resultant);
                const ids = response.resultant.map((d) => d.dId)
                updateSelectedDeviceList(ids)
            }).catch(error => console.log(error))
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }, [selectedGroup])

    useEffect(() => {
        setIsLoading(true);
        if (page) {
            getDeviceFirmware(page)
                .then(response => {
                    setFirmwareList(response.data);
                    setTotal(response.total);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }, [page])

    /**
     * delete
     */
    const deleteFirmware = useCallback((id) => {
        MessageBox.msgbox({
            customClass: 'confirm-box',
            title: 'Message',
            message: 'Are you sure you want to delete the fota uploaded?',
            showClose: false,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'el-button--danger',
            cancelButtonClass: 'el-button--success',
            confirmButtonText: 'Okay'
        }).then(action => {
            if (action === 'confirm') {
                setIsLoading(true);
                deleteFirmwareData(id)
                    .then((res) => {
                        if (res.error === false) {
                            getDeviceFirmware(page || 1)
                                .then(response => {
                                    setFirmwareList(response.data);
                                    setTotal(response.total);
                                })
                                .catch(error => console.log(error))
                                .finally(() => {
                                    setIsLoading(false);
                                })
                        }

                    })
                    .catch(error => console.log(error))
            }

        })
    }, [page]);

    /**
     * view data
     */
    const viewFirmware = useCallback((row) => {
        MessageBox.msgbox({
            customClass: 'confirm-box no-btns',
            title: 'Device List',
            message: <>
                <DeviceInfo data={row} />
            </>
        })
    }, [])


    const updateFirmware = useCallback((id) => {
        MessageBox.msgbox({
            customClass: 'confirm-box',
            title: 'Message',
            message: 'Are you sure you want to update the device?',
            showClose: false,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'el-button--danger',
            cancelButtonClass: 'el-button--success',
            confirmButtonText: 'Okay'
        }).then(action => {
            if (action === 'confirm') {
                setIsLoading(true);
                updateFirmwareData(id)
                    .then((res) => {
                        if (res.error === false) {
                            getDeviceFirmware(page || 1)
                                .then(response => {
                                    setFirmwareList(response.data);
                                    setTotal(response.total);
                                })
                                .catch(error => console.log(error))
                                .finally(() => {
                                    setIsLoading(false);
                                })
                        }

                    })
                    .catch(error => console.log(error))
            }

        })
    }, [page]);

    const columns = useMemo(() => [
        {
            label: "FOTA Id",
            prop: "fota_txnId"
        },
        {
            label: "File Name",
            prop: "file_name"
        },
        {
            label: "Version",
            prop: "version"
        },
        {
            label: "Description",
            prop: "description"
        },
        {
            label: "Status",
            prop: "version",
            render: (row) => {
                let imgName = 'rejectFOTA.png';
                if (row.status === 'Approved')
                    imgName = 'acceptFOTA.png';
                else if (row.status === 'Pending')
                    imgName = 'pendingFOTA.png';

                return <img className="status-img" alt={row.status} src={`/images/${imgName}`} />
            }
        },
        {
            label: "Created Time",
            prop: "created_dt"
        },
        {
            label: "Approved Time",
            prop: "approval_dt",
            render: (row) => {
                if (row.status === "Approved") {
                    return row.approval_dt;
                } else {
                    return "-"
                }
            }
        },
        {
            label: "Rejected Time",
            prop: "rejection_dt",
            render: (row) => {
                if (row.status === "Approved" || row.status === "Pending") {
                    return "-"
                } else {
                    return row.rejection_dt;
                }
            }
        },
        {
            label: "Action",
            width: "150",
            render: (row) => {
                return <>
                    <img className="action-icon edit" src="/images/editFOTAold.png" alt="edit" onClick={() => {
                        updateFirmware(row.id)

                    }} />
                    <img className="action-icon delete" src="/images/Delet.png" alt="delete" onClick={() => {
                        deleteFirmware(row.id)
                    }} />
                    <img className="action-icon view" src="/images/viewFOTAold.png" alt="view" onClick={() => {
                        viewFirmware(row)
                    }} />
                </>
            }
        }
    ], []);

    const submitHandler = useCallback((d) => {
        console.log(formRef)
        formRef.current.validate((valid) => {
            if (valid) {
                const data = new FormData();
                const group = deviceGroup.find(dv => dv.groupId == d.group_name)
                data.append('group_name', group.groupName)
                data.append('file', d.file)
                data.append('version', d.version)
                data.append('description', d.description);
                data.append('file_name', d.file_name);
                const device = deviceList.filter((d) => {
                    return selectedDeviceList.includes(d.dId)
                })
                data.append('devices', JSON.stringify(device));
                setIsLoading(true);
                createFotaFirmware(data)
                    .then((res) => {
                        updateFormData({})
                        getDeviceFirmware(page || 1)
                            .then(response => {
                                setFirmwareList(response.data);
                                setTotal(response.total);
                            })
                            .catch(error => console.log(error))
                            .finally(() => {
                                setIsLoading(false);
                            })
                    })
                    .catch(() => {

                    })
            }
        })

    }, [deviceList, selectedDeviceList, deviceGroup, page, formRef]);


    return <div id="firmware-upload-page" className="page">
        <Loading loading={isLoading} text="Loading...">
            <NavBar />
            <Layout.Row>
                <Layout.Col span={4} className="sidebar-wrapper">
                    <Sidebar />
                </Layout.Col>
                <Layout.Col span={20}>
                    <div className="page__inner">
                        <Layout.Row>
                            <Layout.Col span={24}>
                                <h4 className="page__title">{role.role}</h4>
                                <Card>
                                    <h5>FOTA Upload</h5>
                                    <Form model={formData} ref={formRef} rules={{
                                        group_name: [
                                            {
                                                required: true,
                                                trigger: 'blur'
                                            }
                                        ],
                                        /* file: [
                                             {
                                                 required: true,
                                                 trigger: 'blur'
                                             }
                                         ],*/
                                        version: [
                                            {
                                                required: true,
                                                trigger: 'blur'
                                            }
                                        ],
                                        description: [
                                            {
                                                required: true,
                                                trigger: 'blur'
                                            }
                                        ],

                                    }}>
                                        <Layout.Row gutter="20">
                                            <Layout.Col sm={24} md={8}>
                                                <Form.Item prop="group_name">
                                                    <Select className="w-100" placeholder="Group List" onChange={(v) => {
                                                        updateSelectedGroup(v);
                                                        updateFormData({ ...formData, group_name: v })
                                                    }}>
                                                        {deviceGroup.map((d) => {
                                                            return <Select.Option label={d.groupName} key={'gl-' + d.groupId} value={d.groupId}>{d.groupName}</Select.Option>
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                            </Layout.Col>
                                            <Layout.Col sm={24} md={8}>
                                                {/* <Checkbox.Group> */}
                                                <div className="w-100 multi-select-custom">
                                                    <label className="multi-select-custom__label">{"Device List (" + selectedDeviceList.length + ")"}</label>
                                                    {/* <Form.Item prop="group_name"> */}
                                                    <Select multiple value={[]} noDataText="No Data" popperClass={"DL-" + selectedDeviceList.length} className="w-100" placeholder={" "}>
                                                        {deviceList.length !== 0 ?
                                                            <Select.Option>
                                                                <Checkbox checked={selectedDeviceList.length === deviceList.length} label={"Select All"} onChange={() => {
                                                                    if (selectedDeviceList.length === deviceList.length) {
                                                                        updateSelectedDeviceList([]);
                                                                    } else {
                                                                        const ids = deviceList.map((d) => d.dId)
                                                                        updateSelectedDeviceList(ids)
                                                                    }
                                                                }} />
                                                            </Select.Option> : null}
                                                        {deviceList.map((d) => {
                                                            return <Select.Option key={"dn-" + d.dId}>
                                                                <div>
                                                                    <div>
                                                                        <Checkbox onChange={() => {
                                                                            if (!selectedDeviceList.includes(d.dId)) {
                                                                                const sd = [...selectedDeviceList];
                                                                                sd.push(d.dId);
                                                                                updateSelectedDeviceList(sd)
                                                                            } else {
                                                                                const i = selectedDeviceList.indexOf(d.dId);
                                                                                const sd = [...selectedDeviceList];
                                                                                sd.splice(i, 1);
                                                                                updateSelectedDeviceList(sd)
                                                                            }

                                                                        }} checked={selectedDeviceList.includes(d.dId)} label={d.serialNo + " - " + d.devType}></Checkbox>
                                                                    </div>
                                                                </div>

                                                            </Select.Option>
                                                        })}


                                                    </Select>
                                                    {/* </Form.Item> */}
                                                </div>
                                                {/* </Checkbox.Group> */}
                                            </Layout.Col>
                                        </Layout.Row>
                                        <Layout.Row gutter="20">
                                            <Layout.Col sm={24} md={8}>
                                                <Form.Item prop="file">
                                                    <input type="file" onChange={(event) => {
                                                        const file = event.target.files[0];
                                                        //  console.log(file);
                                                        const blob = new Blob([file], { type: file.type })
                                                        //console.log(blob)
                                                        updateFormData({ ...formData, file: blob, file_name: file.name })
                                                    }} />
                                                </Form.Item>
                                            </Layout.Col>
                                            <Layout.Col sm={24} md={8}>
                                                <Form.Item prop="version">
                                                    <Input type="number" placeholder="Version" onChange={(v) => {
                                                        updateFormData({ ...formData, version: v })
                                                    }} />
                                                </Form.Item>
                                            </Layout.Col>
                                            <Layout.Col sm={24} md={8}>
                                                <Form.Item prop="description">
                                                    <Input type="text" placeholder="description" onChange={(v) => {
                                                        updateFormData({ ...formData, description: v })
                                                    }} />
                                                </Form.Item>
                                            </Layout.Col>
                                        </Layout.Row>
                                        <Layout.Row style={{ textAlign: "right" }}>
                                            <Layout.Col>
                                                <Button type="primary" onClick={() => submitHandler(formData)}>Submit</Button>
                                            </Layout.Col>
                                        </Layout.Row>
                                    </Form>
                                </Card>
                            </Layout.Col>
                        </Layout.Row>
                        <br />
                        <br />
                        <br />
                        <br />

                        <Layout.Row gutter="20">
                            <Layout.Col sm={24} md={5}>
                                <Select placeholder="Entries" className="w-100">
                                    <Select.Option>aa</Select.Option>
                                </Select>
                            </Layout.Col>
                            <Layout.Col sm={24} md={5}>
                                <Input icon="search" placeholder="Search" type="search" className="w-100" />
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row gutter="20">
                            <Layout.Col sm={24}>
                                <Table className="main-table" columns={columns} data={firmwareList} emptyText="No Data" />
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row justify="end" style={{ textAlign: "right" }}>
                            <Layout.Col>
                                <Pagination layout="prev, pager, next" total={total} small={true} onCurrentChange={(v) => {
                                    updatePage(v)
                                }} />
                            </Layout.Col>
                        </Layout.Row>
                    </div>
                </Layout.Col>

            </Layout.Row>
        </Loading>
    </div>
}

export default FirmwareUpload;