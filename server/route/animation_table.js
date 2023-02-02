const express = require('express');
const router = express.Router();
const db = require('../config/db');
var conditionColumnKey = null
var conditionDataKey = null
var successCnt = 0

// // 파라미터값 전달받아서 쿼리문 실행
// router.post('/animation_table', (req, res) => {
//     keys = Object.keys(req.body);
//     obj_length = Object.keys(req.body).length;
//     sql = `select ${req.body["RequestColumn"]} from animation_table`

//     // 조건 컬럼이 존재할때만
//     if (req.body["ConditionColumn"] != undefined || req.body["ConditionColumn"] != null || req.body["ConditionColumn"] != '') {

//         // req.body에 key값중 conditionColumn이 포함되어있는 key들을 찾아서
//         for (var i = 0; i < obj_length; i++) {
//             if (keys[i].search('ConditionColumn') != -1) {
//                 conditionColumnKey = keys[i];
//             } else if (keys[i].search('ConditionValue') != -1) {
//                 conditionDataKey = keys[i];
//             }

//             if ((conditionColumnKey != null && conditionDataKey != null) || (conditionColumnKey != undefined && conditionDataKey != undefined)) {
//                 // 첫번째에는 where절 붙여서 추가한다
//                 if (successCnt == 0) {
//                     sql += ` where ${req.body[conditionColumnKey]} = '${req.body[conditionDataKey]}'`;
//                 } else if (successCnt > 0) {
//                     // 두번째부터는 and 붙여서 추가한다.
//                     sql += ` and ${req.body[conditionColumnKey]} = '${req.body[conditionDataKey]}'`;
//                 }
//                 conditionColumnKey = null
//                 conditionDataKey = null
//                 successCnt += 1
//             }
//         }
//     }
//     sql += ` order by eqp_cd;`;
//     successCnt = 0
//     db.query(sql, (err, data) => {
//         if (!err) res.json(data);
//         else res.send(err);
//     }
//     )
// }
// );

module.exports = router;