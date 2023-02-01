import React from "react";
import { DatePicker, Layout, Col, Row, Space } from "antd";
import 'antd/dist/antd.min.css';
import '../../css/SearchMenu.css';

function SearchMenu() {
    const { RangePicker } = DatePicker;
    return (
        <>
            <Layout id="layout">
                <Row>
                    <Col span={5} id="colLabel">
                        조회기간
                    </Col>
                    <Col>
                        <RangePicker onOk={() => { console.log('test') }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={5} id="colLabel">
                        조회기간
                    </Col>
                    <Col>
                        test
                    </Col>
                </Row>
                <Row>
                    <Col span={5} id="colLabel">
                        조회기간
                    </Col>
                    <Col>
                        test
                    </Col>
                </Row>
                <Row>
                    <Col span={5} id="colLabel">
                        조회기간
                    </Col>
                    <Col>
                        test
                    </Col>
                </Row>
            </Layout>
        </>
    );
}
export default SearchMenu;