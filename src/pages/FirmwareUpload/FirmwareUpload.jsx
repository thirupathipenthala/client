import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import { Layout, Card, Select, Input, Table, Pagination, Button, Loading, Checkbox } from 'element-react';
import './FirmwareUpload.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getGroupInfos, getDeviceList } from '../../services/firmware';

const columns = [
    {
        label: "FOTA Id",
        prop: "id"
    },
    {
        label: "File Name",
        prop: "file"
    },
    {
        label: "Version",
        prop: "version"
    },
    {
        label: "Description",
        prop: "version"
    },
    {
        label: "Status",
        prop: "version",
        render: (row) => {
            return <Button>S</Button>
        }
    }
];

const FirmwareUpload = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [deviceGroup, setDeviceGroup] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [selectedGroup, updateSelectedGroup] = useState(null);
    const [selectedDeviceList, updateSelectedDeviceList] = useState([]);

    useEffect(() => {
        getGroupInfos()
        .then(response => {
            setDeviceGroup(response.resultant);
            
        })
        .catch(error => console.log(error))
        .finally(() => {
            setIsLoading(false);
        })
    },[])


    useEffect(() => {
        if(selectedGroup) {
            setIsLoading(true);
            getDeviceList(selectedGroup).then(response => {
                setDeviceList(response.resultant);
            }).catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false);
            })
        }
    },[selectedGroup])


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
                            <h4 className="page__title">Release Manager</h4>
                            <Card>
                                <h5>FOTA Upload</h5>
                                <Layout.Row gutter="20">
                                    <Layout.Col sm={24} md={8}>
                                        <Select className="w-100" placeholder="Group List" onChange={(v) => {
                                            updateSelectedGroup(v);
                                        }}>
                                            {deviceGroup.map((d) => {
                                                return <Select.Option label={d.groupName} key={'gl-'+d.groupId} value={d.groupId}>{d.groupName}</Select.Option>
                                            })}
                                        </Select>
                                    </Layout.Col>
                                    <Layout.Col sm={24} md={8}>
                                    {/* <Checkbox.Group> */}
                                        <Select multiple value={[]} noDataText="No Data" popperClass={"DL-"+selectedDeviceList.length} className="w-100" placeholder={"Device List (" +selectedDeviceList.length + ")"}>
                                        
                                            {deviceList.map((d) => {
                                                return <Select.Option key={"dn-"+d.dId}>
                                                    <div>
                                                        <div>
                                                            <Checkbox onChange={() => {
                                                                if(!selectedDeviceList.includes(d.dId)) {
                                                                    const sd = [...selectedDeviceList];
                                                                    sd.push(d.dId);
                                                                    updateSelectedDeviceList(sd)
                                                                } else {
                                                                    const i = selectedDeviceList.indexOf(d.dId);
                                                                    const sd = [...selectedDeviceList];
                                                                    sd.splice(i, 1);
                                                                    updateSelectedDeviceList(sd)
                                                                }

                                                            }} checked={selectedDeviceList.includes(d.dId)} label={d.serialNo + " - "+d.devType}></Checkbox>
                                                        </div>
                                                    </div>
                                                    
                                                </Select.Option>
                                            })}
                                        
                                        
                                        </Select>
                                    {/* </Checkbox.Group> */}
                                    </Layout.Col>
                                </Layout.Row>
                                <Layout.Row gutter="20">
                                    <Layout.Col sm={24} md={8}>
                                        <Input type="file" />
                                    </Layout.Col>
                                    <Layout.Col sm={24} md={8}>
                                        <Input type="text" placeholder="Version"/>
                                    </Layout.Col>
                                    <Layout.Col sm={24} md={8}>
                                        <Input type="text" placeholder="Description"/>
                                    </Layout.Col>
                                </Layout.Row>
                                <Layout.Row style={{textAlign: "right"}}>
                                    <Layout.Col>
                                        <Button type="primary">Submit</Button>
                                    </Layout.Col>
                                </Layout.Row>
                            </Card>
                        </Layout.Col>
                    </Layout.Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
             
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
                            <Table className="main-table" columns={columns} data={[]} emptyText="No Data" />
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row justify="end" style={{textAlign: "right"}}>
                        <Layout.Col>
                            <Pagination layout="prev, pager, next" total={50} small={true}/>
                        </Layout.Col>
                    </Layout.Row>
                </div>
            </Layout.Col>
            
        </Layout.Row>
        </Loading>
    </div>
}

export default FirmwareUpload;