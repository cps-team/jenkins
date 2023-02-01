import React, { useEffect, useState } from "react";
import { Table } from "antd";
import 'antd/dist/antd.min.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../../css/DataTable.css';
import { useSelector } from 'react-redux';
import CommonEnum from '../../Util/CommonEnum';


function MachineLogDataTable() {
    let { id } = useParams();
    const [data, setData] = useState();
    const [columns, setColumns] = useState();
    const tabItem = useSelector(state => state);
    const Enum = new CommonEnum();



    useEffect(() => {
        axios.post('/Machine/GetMachineTableData', {
            'companyCode': sessionStorage.getItem('companyCode'),
            'factoryCode': sessionStorage.getItem('factoryCode'),
            'blockCode': sessionStorage.getItem('blockCode'),
            'districtCode': sessionStorage.getItem('districtCode'),
            'machineCode': id,
            'itemType': tabItem
        }).then(res => {
            // 컬럼명 삽입
            const machineLogColumns = Object.keys(res.data[0]).map((item, i) => {
                return {
                    title: Enum[item],
                    dataIndex: "column" + i,
                    key: "column" + i,
                };
            });
            setColumns(machineLogColumns);

            const itemKey = Object.keys(res.data[0]);

            const dataList = res.data.map((item, i) => {
                let resultObject = {};
                resultObject['key'] = i;
                for (let j = 0; j < itemKey.length; j++) {
                    resultObject[`column${j}`] = item[itemKey[j]]
                }
                return resultObject
            })
            setData(dataList);
        })
    }, []);

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                scroll={{ x: '100%', y: 240 }}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: false,
                }}
            />
        </>
    );
}

export default MachineLogDataTable;