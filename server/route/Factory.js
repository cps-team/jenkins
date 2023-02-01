const express = require("express");
const { Helper } = require("../Common/Helper");
const router = express.Router();

// 공장, 공장동, 공장구역 정보 리스트 반환
router.post("/GetFactoryBlockDistrictList", async (req, res) => {
    const helper = new Helper();
    let getFactoryBlockDistrictList = await helper.GetFactoryBlockDistrictList(req.query.factoryCode);
    res.send(getFactoryBlockDistrictList);
});

module.exports = router;