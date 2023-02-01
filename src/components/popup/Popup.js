import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Tabs, Typography, Row, Col } from "antd";
import { Sticky, StickyContainer } from 'react-sticky';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import MachineStatics from "./MachineStatics";
import 'antd/dist/antd.min.css';
import '../../css/PopUp.css';

function PopUp() {
    const [machineName, setMachineName] = useState();
    const { id } = useParams();
    const { Title } = Typography;
    const { Header } = Layout;
    const dispatch = useDispatch();

    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({ style }) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );

    const items = [
        {
            label: (<span>Cycle</span>),
            key: 'cycle',
            children: <MachineStatics /> // 이렇게하지말고 redux적용시켜서하기
        },
        {
            label: (<span>Signal</span>),
            key: 'signal',
            children: <MachineStatics />
        },
        {
            label: (<span>Param</span>),
            key: 'param',
            children: <MachineStatics />
        },
        {
            label: (<span>Mete</span>),
            key: 'mete',
            children: <MachineStatics />
        },
        {
            label: (<span>Plan</span>),
            key: 'plan',
            children: <MachineStatics />
        },
        {
            label: (<span>Result</span>),
            key: 'result',
            children: <MachineStatics />
        }
    ];
    dispatch({ type: '', payload: 'cycle' });
    useEffect(() => {
        axios.post('/Machine/GetMachineName', {
            'companyCode': sessionStorage.getItem('companyCode'),
            'factoryCode': sessionStorage.getItem('factoryCode'),
            'blockCode': sessionStorage.getItem('blockCode'),
            'districtCode': sessionStorage.getItem('districtCode'),
            'machineCode': id,
        })
            .then(res => {
                setMachineName(res.data);
            })
    }, [id]);

    return (
        <Layout style={{ height: '100%', minWidth: '1086px', minHeight: '845px' }}>
            <Header>
                <Row style={{ height: "80px" }}>
                    <Col span={5} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Title level={2} style={{ color: 'white' }}>Statistics</Title>
                    </Col>
                    <Col span={14} >
                    </Col>
                    <Col span={5} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Title level={5} style={{ color: 'white' }} >{machineName}</Title>
                    </Col>
                </Row>
            </Header>

            <Row style={{ height: '100%' }}>
                <Col span={24} align="center" >
                    <StickyContainer style={{ height: '100%' }}>
                        <Tabs defaultActiveKey="1"
                            renderTabBar={renderTabBar}
                            items={items}
                            style={{ height: '100%' }}
                            onTabClick={(key) => dispatch({ type: '', payload: key })} />
                    </StickyContainer>
                </Col>
            </Row>
        </Layout >
    );
}

export default PopUp;