const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { Helper } = require("../Common/Helper")
const moment = require("moment");

// router.use(express.static(path.join(__dirname, 'public')));

router.post("/onLogin", (req, res) => {
  const user_id = req.query.user_id;
  const user_pwd = req.query.user_pw;


  // 입력된 id와 동일한 id 가 db에 있는지 확인
  const sql1 = `select count(*) as result from t_mas_user where c_account = '${user_id}'`;
  db.query(sql1, (err, data) => {
    if (!err) {
      // 결과값이 1보다 작다면(동일한 id가 없다면)
      if (data.rows[0].result < 1) {
        res.send(data);
      } else {
        const sql2 = `SELECT 
                CASE (SELECT COUNT(*) FROM t_mas_user WHERE c_account = '${user_id}' AND c_password = '${user_pwd}')
                    WHEN '0' THEN NULL
                    ELSE (SELECT c_account FROM t_mas_user WHERE c_account = '${user_id}' AND c_password = '${user_pwd}')
                END AS userid
                , CASE (SELECT COUNT(*) FROM t_mas_user WHERE c_account = '${user_id}' AND c_password = '${user_pwd}')
                    WHEN '0' THEN NULL
                    ELSE (SELECT c_password FROM t_mas_user WHERE c_account = '${user_id}' AND c_password = '${user_pwd}')
                END AS userpwd,
                (select c_code from t_mas_company where c_id = c_company_id) as companycode, 
                c_name as username from t_mas_user where c_account = '${user_id}' and c_password = '${user_pwd}'`
        db.query(sql2, (err, data) => {
          // 비밀번호를 틀렸을때
          if (!err && data.rows.length > 0) {
            let date = moment();
            let currentDate = date.format("YYYY-MM-DD HH:mm:ss");
            const sql3 = `INSERT INTO t_log_user (c_time, c_log_tp, c_account) VALUES('${currentDate}', 'LOGIN', '${user_id}');`
            db.query(sql3);
            res.send(data);
          } else {
            res.send('wrongPassword');
          }
        });
      }
    } else {
      res.send(err);
    }
  });
});

router.post("/onLogout", (req, res) => {
  let date = moment();
  let currentDate = date.format("YYYY-MM-DD HH:mm:ss");
  const user_id = req.query.user_id;
  const sql1 = `INSERT INTO t_log_user (c_time, c_log_tp, c_account) VALUES('${currentDate}', 'LOGOUT', '${user_id}');`
  db.query(sql1);
});

// 유저 회원가입
router.post("/signUpSubmit", (req, res) => {
  const login_user_id = req.query.id;
  const login_user_pwd = req.query.pw;
  const comp_name = req.query.compName;
  const comp_reg_num = req.query.compRegNum;
  const ceo_name = req.query.ceoName;
  const comp_address = req.query.compAddress;
  const comp_tel = req.query.compTel;

  // const sql1 = `insert into t_mas_user (id, pwd, comp_nm, comp_reg_no, ceo_nm, comp_addr, comp_tel)
  // values('${login_user_id}','${login_user_pwd}','${comp_name}','${comp_reg_num}','${ceo_name}','${comp_address}','${comp_tel}')`;
  const sql1 = `INSERT INTO t_mas_user (c_company_id, c_account, c_name, c_password, c_time) VALUES();`


  db.query(sql1, (err) => {
    if (!err) res.send("success");
    else res.send(err);
  });
});

// 아이디 중복확인 체크
router.post("/idDuplicationCheck", (req, res) => {
  const login_user_id = req.query.id;
  const sql = `select count(*) as result from t_mas_user where c_account = '${login_user_id}'`;
  db.query(sql, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

// 해당사용자의 기준정보추출
router.post('/StandardInfo', async (req, res) => {
  const helper = new Helper();
  let standardInfoData = await helper.StandardInfo(req.body.CompanyCode);
  res.send(JSON.stringify(standardInfoData));
});

// 접근가능 지역리스트 정보 반환
router.post('/accessibleLocationInfo', async (req, res) => {
  const helper = new Helper();
  let accessibleLocationInfo = await helper.AccessibleLocationInfo(req.query.userId);
  res.send(accessibleLocationInfo);
});

// 접근 불가능 지역리스트 반환
router.post('/inAccessibleLocationInfo', async (req, res) => {
  const helper = new Helper();
  let inAccessibleLocationInfo = await helper.InaccessibleLocationInfo(req.query.userId);
  res.send(inAccessibleLocationInfo);
});

// 사용자이력정보
router.post("/UserLogInfo", async (req, res) => {
  const helper = new Helper();
  let userLogInfo = await helper.UserLogInfo(req.body.userId);
  res.send(JSON.stringify(userLogInfo));
});

module.exports = router;
