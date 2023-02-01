const express = require("express");
const { Helper } = require("../Common/Helper");
const router = express.Router();

//설비명 반환
router.post("/GetMachineName", async (req, res) => {
    const helper = new Helper();
    let getMachineName = await helper.GetMachineName(req.body);
    res.send(getMachineName);
});

// 설비 현황정보 반환
router.post("/GetMachineStateInfoList", async (req, res) => {
    const helper = new Helper();
    let GetMachineStateInfoList = await helper.GetMachineStateInfoList(req.body);
    res.send(JSON.stringify(GetMachineStateInfoList));
});

// 설비 운행정보 이력 반환_데이터테이블
router.post('/GetMachineTableData', async (req, res) => {
    const helper = new Helper();
    let getMachineTableData = await helper.GetMachineTableData(req.body)
    res.send(getMachineTableData);
});

// 설비 운행정보 이력 반환_차트
router.post('/GetMachineChartData', async (req, res) => {
    const helper = new Helper();
    let getMachineChartData = await helper.GetMachineChartData(req.body)
    res.send(getMachineChartData);
});

router.post('/GetMachineRaialBarChartData', async (req, res) => {
    const helper = new Helper();
    let getMachineRaialBarChartData = await helper.GetMachineRaialBarChartData(req.body)
    res.send(getMachineRaialBarChartData);
})


module.exports = router;