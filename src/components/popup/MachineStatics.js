import React from "react";
import { Row, Col } from "antd";
import MachineChart from "./Chart/MachineChart";
import MachineDataTable from "./DataTable/MachineDataTable";
import MachineRadialBarChart from './Chart/MachineRadialBarChart';




function MachineStatics() {
    return (
        <Row>
            <Col style={{ backgroundColor: "white", width: '50%' }}>
                <MachineRadialBarChart />
            </Col>
            <Col style={{ width: '50%' }}>
                <Row style={{ backgroundColor: "white", height: '50%' }}>
                    <MachineChart />
                </Row>

                <Row style={{ backgroundColor: "white", height: '50%' }}>
                    <MachineDataTable />
                </Row>
            </Col>
        </Row>
    )
}


export default MachineStatics;