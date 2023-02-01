class CommonSql {
    constructor() {
        this.select_TmasterComp = `select * from t_master_company `;
        this.select_TmaterFacAll = `select * from t_master_factory `;
        this.select_TmaterMacAll = `select * from t_master_machine `;
        this.select_TmaterActAll = `select * from t_master_action `;
        this.select_TmaterMachineSignalAll = `select * from t_master_machine_signal `;
        this.select_TmaterUserAll = `select * from t_master_user `;

        this.where_Code = `where code = `;
        this.where_Name = `where name = `;
        this.where_CompCd = `where comp_cd = `;
        this.where_Address = `where address = `;
        this.where_Location = `where location = `;
        this.where_FacCd = `where fac_cd = `;
        this.where_Type = `where type = `;
        this.where_MacCd = `where mac_cd = `;
        this.where_SignalCd = `where signal_cd = `;
        this.where_DataType = `where dataType = `;
        this.where_Unit = `where unit = `;
        this.where_Id = `where id = `;
    }

    // select 절
    Select_TmasterCompAll() {
        return this.select_TmasterComp;
    }

    Select_TmaterFacAll() {
        return this.select_TmaterFacAll;
    }

    Select_TmaterMacAll() {
        return this.select_TmaterMacAll;
    }

    Select_TmaterActAll() {
        return this.select_TmaterActAll;
    }

    Select_TmaterMachineSignalAll() {
        return this.select_TmaterMachineSignalAll;
    }

    Select_TmaterUserAll() {
        return this.select_TmaterUserAll;
    }


    // where 절
    Where_Code(code) {
        return this.where_Code + `'${code}'`;
    }

    Where_Name(name) {
        return this.where_Name + `'${name}'`;
    }

    Where_CompCd(comp_cd) {
        return this.where_CompCd + `'${comp_cd}'`;
    }

    Where_Address(address) {
        return this.where_Address + `'${address}'`;
    }

    Where_Location(location) {
        return this.where_Location + `'${location}'`;
    }

    Where_FacCd(fac_cd) {
        return this.where_FacCd + `'${fac_cd}'`;
    }

    Where_Type(type) {
        return this.where_Type + `'${type}'`;
    }

    Where_MacCd(mac_cd) {
        return this.where_MacCd + `'${mac_cd}'`;
    }

    Where_SignalCd(signal_cd) {
        return this.where_SignalCd + `'${signal_cd}'`;
    }

    Where_DataType(dataType) {
        return this.where_DataType + `'${dataType}'`;
    }

    Where_Unit(unit) {
        return this.where_Unit + `'${unit}'`;
    }

    Where_Id(id) {
        return this.where_Id + `'${id}'`;
    }
}

module.exports.CommonSql = CommonSql;
