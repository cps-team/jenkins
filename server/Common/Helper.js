const db = require("../config/db")
const { Company } = require("../Model/Standard/Company")
const { Factory } = require("../Model/Standard/Factory")
const { Block } = require("../Model/Standard/Block")
const { District } = require("../Model/Standard/District")
const { Machine } = require("../Model/Standard/Machine")
const { Animation } = require("../Model/Standard/Animation")
const { User } = require("../Model/Standard/User")
const { UserLog } = require("../Model/Log/UserLog");
const { MachineState } = require("../Model/State/MachineState");
const { CommonSql } = require("../Common/CommonSql");

class Helper {
    // 기준정보
    StandardInfo = async (paramCompanyCode) => {
        // 회사정보
        let sql1 = `select * from t_mas_company where c_code = '${paramCompanyCode}' order by c_code asc;`
        let companyData = await db.query(sql1);
        let company;
        for (let companyRow of companyData.rows) {
            const { c_code, c_name, c_desc, c_visible, c_time } = companyRow;
            company = new Company(c_code, c_name, c_desc, c_visible, c_time);
            // 공장정보
            let sql2 = `select * from t_mas_factory where c_company_id = '${companyRow.c_id}' order by c_code asc;`
            let factoryData = await db.query(sql2);
            for (let factoryRow of factoryData.rows) {
                const { c_code, c_name, c_address, c_latitude, c_longitude, c_desc, c_visible, c_time } = factoryRow;
                let factory = new Factory(c_code, c_name, c_address, c_latitude, c_longitude, c_desc, c_visible, c_time);
                // 공장동정보
                let sql3 = `select * from t_mas_block where c_factory_id = '${factoryRow.c_id}' order by c_code asc;`
                let blockData = await db.query(sql3);
                for (let blockRow of blockData.rows) {
                    const { c_code, c_name, c_desc, c_visible, c_time } = blockRow;
                    let block = new Block(c_code, c_name, c_desc, c_visible, c_time);
                    // 공장동의 구역정보
                    let sql4 = `select * from t_mas_district where c_block_id = '${blockRow.c_id}' order by c_code asc;`
                    let districtData = await db.query(sql4);
                    for (let districtRow of districtData.rows) {
                        const { c_code, c_name, c_url, c_desc, c_visible, c_time, c_img } = districtRow;
                        let district = new District(c_code, c_name, c_url, c_desc, c_visible, c_time, c_img)
                        // 구역의 각 설비정보
                        let sql5 = `select * from t_mas_machine where c_district_id = '${districtRow.c_id}' order by c_code asc;`
                        let machineData = await db.query(sql5);
                        for (let machineRow of machineData.rows) {
                            const { c_code, c_name, c_type, c_desc, c_visible, c_time } = machineRow;
                            let machine = new Machine(c_code, c_name, c_type, c_desc, c_visible, c_time);
                            // 설비의 애니메이션 정보
                            let sql6 = `select * from t_mas_animation where c_machine_id = '${machineRow.c_id}' order by c_code asc;`
                            let animationData = await db.query(sql6);
                            for (let animationRow of animationData.rows) {
                                const { c_code, c_desc, c_frameRate, c_time } = animationRow;
                                let animation = new Animation(c_code, c_desc, c_frameRate, c_time);
                                machine.Animations.push(animation);
                            }
                            district.Machines.push(machine);
                        }
                        block.Districts.push(district);
                    }
                    factory.Blocks.push(block);
                }
                company.Factories.push(factory);
            }
            // 유저정보
            let sql7 = `select * from t_mas_user where c_company_id = '${companyRow.c_id}';`
            let userData = await db.query(sql7);
            for (let userRow of userData.rows) {
                const { c_account, c_name, c_time } = userRow;
                let user = new User(c_account, c_name, c_time);
                company.Users.push(user);
            }
        }
        return company

    }

    // 특정 사용자의 이력정보 return 
    UserLogInfo = async (paramUserId) => {
        let userLogList = [];
        let sql1 = `select * from t_log_user where user_id = '${paramUserId}';`;
        let userLogData = await db.query(sql1);
        for (let userLogRow of userLogData.rows) {
            const { user_id, action, time } = userLogRow
            let userLog = new UserLog(user_id, action, time);
            userLogList.push(userLog);
        }
        return userLogList;
    }

    // 접근가능 공장정보 리스트  return
    AccessibleLocationInfo = async (paramUserId) => {
        let locList = [];
        const sql1 = `
        select c.c_code, c.c_name, c.c_latitude, c.c_longitude, c.c_desc from t_mas_permition a
        join t_mas_user b
        on a.c_user_id = b.c_id
        join t_mas_factory c
        on a.c_factory_id = c.c_id
        where b.c_account = '${paramUserId}';
        `

        let locData = await db.query(sql1);
        for (let locRow of locData.rows) {
            locList.push(locRow)
        }
        return locList;
    }

    // 접근불가능 공장정보리스트 return
    InaccessibleLocationInfo = async (paramUserId) => {
        let locList = [];
        const sql1 = `
        select c.c_code, c.c_name, c.c_latitude, c.c_longitude, c.c_desc from t_mas_permition a
        join t_mas_user b
        on a.c_user_id = b.c_id
        join t_mas_factory c
        on a.c_factory_id = c.c_id
        where b.c_account != '${paramUserId}';
        `

        let locData = await db.query(sql1);
        for (let locRow of locData.rows) {
            locList.push(locRow)
        }
        return locList;
    }

    // 설비명 return 
    GetMachineName = async (param) => {
        const sql1 = `
        select e.c_name from t_mas_company a
        join t_mas_factory b
        on a.c_id = b.c_company_id
        join t_mas_block c
        on b.c_id = c.c_factory_id
        join t_mas_district d
        on c.c_id = d.c_block_id
        join t_mas_machine e
        on d.c_id = e.c_district_id
        where a.c_code = '${param.companyCode}'
        and b.c_code = '${param.factoryCode}'
        and c.c_code = '${param.blockCode}'
        and d.c_code = '${param.districtCode}'
        and e.c_code = '${param.machineCode}'
        order by e.c_name asc;
        `
        let macData = await db.query(sql1);
        return macData.rows[0].c_name
    }

    //공장, 공장동, 구역정보 list return
    GetFactoryBlockDistrictList = async (paramFactoryCode) => {
        let blockList = [];
        const sql1 = `
        select b.c_code as blockcode, b.c_name as blockname, b.c_desc as blockdesc from t_mas_factory a
            join t_mas_block b
            on a.c_id = b.c_factory_id
            where a.c_code = '${paramFactoryCode}';
        `
        let blockData = await db.query(sql1);
        for (let blockRow of blockData.rows) {
            blockList.push(blockRow);
        }
        return blockList;
    }

    GetMachineStateInfoList = async (param) => {
        let machineStateInfoList = [];
        const sql1 = `
        select e.c_code, e.c_name, e.c_type, f.c_item_name, f.c_item_value, f.c_time from t_mas_company a
        join t_mas_factory b
        on a.c_id = b.c_company_id
        join t_mas_block c
        on b.c_id = c.c_factory_id
        join t_mas_district d
        on c.c_id = d.c_block_id
        join t_mas_machine e
        on d.c_id = e.c_district_id
        join t_sta_machine f
        on e.c_id = f.c_machine_id
        where a.c_code = '${param.CompanyCode}'
        and b.c_code = '${param.FactoryCode}'
        and c.c_code = '${param.BlockCode}'
        and d.c_code = '${param.DistrictCode}'
        order by e.c_code, f.c_item_name asc;
        `;

        let machineStateInfoData = await db.query(sql1);
        for (let machineStateInfoRow of machineStateInfoData.rows) {
            const { c_code, c_name, c_type, c_item_name, c_item_value, c_item_type, c_desc, c_time } = machineStateInfoRow;
            let machineStateInfo = new MachineState(c_code, c_name, c_type, c_item_name, c_item_value, c_item_type, c_desc, c_time);
            machineStateInfoList.push(machineStateInfo);
        }
        return machineStateInfoList;
    }

    //설비 정보 return 테이블용
    GetMachineTableData = async (param) => {
        let sql1 = null;
        let machineLogList = [];
        if (param.itemType === 'cycle') {
            sql1 =
                `SELECT
            COALESCE(start_time, end_time) as start_time, COALESCE(end_time, start_time) as end_time,
            e.c_type as machine_type 
            FROM 
                (SELECT c_machine_id, DATE(c_time) as date, MAX(CASE WHEN c_item_value = '0' THEN to_char(c_time, 'yyyy-mm-dd hh24:mi:ss') END) as start_time, MAX(CASE WHEN c_item_value = '1' THEN to_char(c_time, 'yyyy-mm-dd hh24:mi:ss') END) as end_time
                FROM t_log_machine
                WHERE c_item_tp = 'cycle'
                GROUP BY c_machine_id, date) f
            JOIN t_mas_machine e 
            ON e.c_id = f.c_machine_id
            JOIN t_mas_district d 
            ON d.c_id = e.c_district_id
            JOIN t_mas_block c 
            ON c.c_id = d.c_block_id
            JOIN t_mas_factory b 
            ON b.c_id = c.c_factory_id
            JOIN t_mas_company a 
            ON a.c_id = b.c_company_id
            WHERE a.c_code = '${param.companyCode}'  
            AND b.c_code = '${param.factoryCode}'  
            AND c.c_code = '${param.blockCode}'   
            AND d.c_code = '${param.districtCode}'  
            AND e.c_code = '${param.machineCode}'
            GROUP BY  e.c_type, start_time, end_time;`;
        } else if (param.itemType === 'signal') {
            sql1 =
                `SELECT f.log_Time, f.machine_temp from (                                                                              
                        SELECT c_machine_id, to_char(c_time, 'yyyy-mm-dd hh24:mi:ss') as log_Time, c_item_value as machine_temp   
                        FROM t_log_machine                                                                                          
                        WHERE c_item_name = '설비온도(°C)' AND c_item_tp = 'signal'                                                     
                        ) f                                                                                                         
            JOIN t_mas_machine e                                                                                                    
            ON e.c_id = f.c_machine_id                                                                                              
            JOIN t_mas_district d                                                                                                   
            ON d.c_id = e.c_district_id                                                                                             
            JOIN t_mas_block c                                                                                                      
            ON c.c_id = d.c_block_id                                                                                                
            JOIN t_mas_factory b                                                                                                    
            ON b.c_id = c.c_factory_id                                                                                              
            JOIN t_mas_company a                                                                                                    
            ON a.c_id = b.c_company_id                                                                                              
            WHERE a.c_code = '${param.companyCode}'  
            AND b.c_code = '${param.factoryCode}'  
            AND c.c_code = '${param.blockCode}'   
            AND d.c_code = '${param.districtCode}'  
            AND e.c_code = '${param.machineCode}'                                                                        
            order by f.log_Time asc;`;
        } else {
            sql1 =
                `SELECT
            COALESCE(start_time, end_time) as start_time, COALESCE(end_time, start_time) as end_time,
            e.c_type as machine_type 
            FROM 
                (SELECT c_machine_id, DATE(c_time) as date, MAX(CASE WHEN c_item_value = '0' THEN to_char(c_time, 'yyyy-mm-dd hh24:mi:ss') END) as start_time, MAX(CASE WHEN c_item_value = '1' THEN to_char(c_time, 'yyyy-mm-dd hh24:mi:ss') END) as end_time
                FROM t_log_machine
                WHERE c_item_tp = 'cycle'
                GROUP BY c_machine_id, date) f
            JOIN t_mas_machine e 
            ON e.c_id = f.c_machine_id
            JOIN t_mas_district d 
            ON d.c_id = e.c_district_id
            JOIN t_mas_block c 
            ON c.c_id = d.c_block_id
            JOIN t_mas_factory b 
            ON b.c_id = c.c_factory_id
            JOIN t_mas_company a 
            ON a.c_id = b.c_company_id
            WHERE a.c_code = '${param.companyCode}'  
            AND b.c_code = '${param.factoryCode}'  
            AND c.c_code = '${param.blockCode}'   
            AND d.c_code = '${param.districtCode}'  
            AND e.c_code = '${param.machineCode}'
            GROUP BY  e.c_type, start_time, end_time;`;
        }
        try {
            let machineLogData = await db.query(sql1);
            for (let machineLogRow of machineLogData.rows) {
                machineLogList.push(machineLogRow);
            }
            return machineLogList;
        } catch (err) {
            console.error(err);
        }
    }

    // 설비정보 return 그래프용
    GetMachineChartData = async (param) => {
        let sql1 = null;
        let machineLogList = [];
        if (param.itemType === 'cycle') {
            sql1 =
                `SELECT
                to_char(f.date, 'yyyy-mm-dd') as date, to_char(f.daily_uptime, 'hh:mi:ss') as daily_uptime
                FROM 
                    (SELECT c_machine_id, 
                    DATE(c_time) as date, 
                    MAX(CASE WHEN c_item_value = '1' THEN c_time END) - MAX(CASE WHEN c_item_value = '0' THEN c_time END) as daily_uptime 
                    FROM t_log_machine
                    WHERE c_item_tp = 'cycle'
                    GROUP BY c_machine_id, date
                    order by date) f
                JOIN t_mas_machine e 
                ON e.c_id = f.c_machine_id
                JOIN t_mas_district d 
                ON d.c_id = e.c_district_id
                JOIN t_mas_block c 
                ON c.c_id = d.c_block_id
                JOIN t_mas_factory b 
                ON b.c_id = c.c_factory_id
                JOIN t_mas_company a 
                ON a.c_id = b.c_company_id
                WHERE a.c_code = '${param.companyCode}'  
                AND b.c_code = '${param.factoryCode}'  
                AND c.c_code = '${param.blockCode}'   
                AND d.c_code = '${param.districtCode}'  
                AND e.c_code = '${param.machineCode}';`
        } else if (param.itemType === 'signal') {
            sql1 = `SELECT
            f.date, daily_temp
            FROM
                (select c_machine_id, to_char(c_time, 'yyyy-mm-dd') as date, round(avg(cast(c_item_value as numeric)), 2) as daily_temp
                from t_log_machine
                where c_item_tp = 'signal'
                group by c_machine_id, date
                order by date
                ) f
            JOIN t_mas_machine e 
            ON e.c_id = f.c_machine_id
            JOIN t_mas_district d 
            ON d.c_id = e.c_district_id
            JOIN t_mas_block c 
            ON c.c_id = d.c_block_id
            JOIN t_mas_factory b 
            ON b.c_id = c.c_factory_id
            JOIN t_mas_company a 
            ON a.c_id = b.c_company_id
            WHERE a.c_code = '${param.companyCode}'  
            AND b.c_code = '${param.factoryCode}'  
            AND c.c_code = '${param.blockCode}'   
            AND d.c_code = '${param.districtCode}'  
            AND e.c_code = '${param.machineCode}';`
        } else {
            sql1 =
                `SELECT
                to_char(f.date, 'yyyy-mm-dd') as date, to_char(f.daily_uptime, 'hh:mi:ss') as daily_uptime
                FROM 
                    (SELECT c_machine_id, 
                    DATE(c_time) as date, 
                    MAX(CASE WHEN c_item_value = '1' THEN c_time END) - MAX(CASE WHEN c_item_value = '0' THEN c_time END) as daily_uptime 
                    FROM t_log_machine
                    WHERE c_item_tp = 'cycle'
                    GROUP BY c_machine_id, date
                    order by date) f
                JOIN t_mas_machine e 
                ON e.c_id = f.c_machine_id
                JOIN t_mas_district d 
                ON d.c_id = e.c_district_id
                JOIN t_mas_block c 
                ON c.c_id = d.c_block_id
                JOIN t_mas_factory b 
                ON b.c_id = c.c_factory_id
                JOIN t_mas_company a 
                ON a.c_id = b.c_company_id
                WHERE a.c_code = '${param.companyCode}'  
                AND b.c_code = '${param.factoryCode}'  
                AND c.c_code = '${param.blockCode}'   
                AND d.c_code = '${param.districtCode}'  
                AND e.c_code = '${param.machineCode}';`
        }

        let machineLogData = await db.query(sql1);
        for (let machineLogRow of machineLogData.rows) {
            machineLogList.push(machineLogRow);
        }
        return machineLogList;
    }

    //설비정보 return RaialBar차트용
    GetMachineRaialBarChartData = async (param) => {
        let sql1 = null;
        let machineLogList = [];
        if (param.itemType === 'cycle') {
            sql1 =
                `SELECT
                    extract(hour from avg(g.daily_uptime)) as daily_uptime_avg, f.now_uptime
                FROM 
                    (SELECT c_machine_id, 
                    DATE(c_time) as date, 
                    MAX(CASE WHEN c_item_value = '1' THEN c_time END) - MAX(CASE WHEN c_item_value = '0' THEN c_time END) as daily_uptime 
                    FROM t_log_machine
                    WHERE c_item_tp = 'cycle'
                    GROUP BY c_machine_id, date
                    order by date) g
                join (SELECT c_machine_id, extract(hour from to_timestamp(c_item_value, 'HH24:MI:SS')) as now_uptime
                        FROM t_sta_machine
                        WHERE c_item_name = '현재가동시간') f
                on f.c_machine_id = g.c_machine_id
                JOIN t_mas_machine e 
                ON e.c_id = f.c_machine_id
                JOIN t_mas_district d 
                ON d.c_id = e.c_district_id
                JOIN t_mas_block c 
                ON c.c_id = d.c_block_id
                JOIN t_mas_factory b 
                ON b.c_id = c.c_factory_id
                JOIN t_mas_company a 
                ON a.c_id = b.c_company_id
                WHERE a.c_code = '${param.companyCode}'  
                    AND b.c_code = '${param.factoryCode}'  
                    AND c.c_code = '${param.blockCode}'   
                    AND d.c_code = '${param.districtCode}'  
                    AND e.c_code = '${param.machineCode}'
                group by f.now_uptime;`;
        } else if (param.itemType === 'signal') {
            sql1 = `select
                    round(avg(daily_temp_avg), 2) as total_temp_avg, f.now_temp 
                    FROM
                        (select c_machine_id, to_char(c_time, 'yyyy-mm-dd') as date, round(avg(cast(c_item_value as numeric)), 2) as daily_temp_avg
                        from t_log_machine
                        where c_item_tp = 'signal'
                        and c_item_name = '설비온도(°C)'
                        group by c_machine_id, date
                        order by date) g
                    join (select c_machine_id, c_item_value as now_temp from t_sta_machine
                        where  c_item_tp = 'signal'
                        and c_item_name = '현재설비온도') f
                    on f.c_machine_id = g.c_machine_id
                    JOIN t_mas_machine e 
                    ON e.c_id = f.c_machine_id
                    JOIN t_mas_district d 
                    ON d.c_id = e.c_district_id
                    JOIN t_mas_block c 
                    ON c.c_id = d.c_block_id
                    JOIN t_mas_factory b 
                    ON b.c_id = c.c_factory_id
                    JOIN t_mas_company a 
                    ON a.c_id = b.c_company_id
                    WHERE a.c_code = '${param.companyCode}'  
                    AND b.c_code = '${param.factoryCode}'  
                    AND c.c_code = '${param.blockCode}'   
                    AND d.c_code = '${param.districtCode}'  
                    AND e.c_code = '${param.machineCode}'
                    group by f.now_temp;`;
        } else {
            sql1 =
                `SELECT
                    extract(hour from avg(g.daily_uptime)) as daily_uptime_avg, f.now_uptime
                FROM 
                    (SELECT c_machine_id, 
                    DATE(c_time) as date, 
                    MAX(CASE WHEN c_item_value = '1' THEN c_time END) - MAX(CASE WHEN c_item_value = '0' THEN c_time END) as daily_uptime 
                    FROM t_log_machine
                    WHERE c_item_tp = 'cycle'
                    GROUP BY c_machine_id, date
                    order by date) g
                join (SELECT c_machine_id, extract(hour from to_timestamp(c_item_value, 'HH24:MI:SS')) as now_uptime
                        FROM t_sta_machine
                        WHERE c_item_name = '현재가동시간') f
                on f.c_machine_id = g.c_machine_id
                JOIN t_mas_machine e 
                ON e.c_id = f.c_machine_id
                JOIN t_mas_district d 
                ON d.c_id = e.c_district_id
                JOIN t_mas_block c 
                ON c.c_id = d.c_block_id
                JOIN t_mas_factory b 
                ON b.c_id = c.c_factory_id
                JOIN t_mas_company a 
                ON a.c_id = b.c_company_id
                WHERE a.c_code = '${param.companyCode}'  
                    AND b.c_code = '${param.factoryCode}'  
                    AND c.c_code = '${param.blockCode}'   
                    AND d.c_code = '${param.districtCode}'  
                    AND e.c_code = '${param.machineCode}'
                group by f.now_uptime;`;
        }
        let machineLogData = await db.query(sql1);
        for (let machineLogRow of machineLogData.rows) {
            machineLogList.push(machineLogRow);
        }
        return machineLogList;
    }
}

module.exports.Helper = Helper; 