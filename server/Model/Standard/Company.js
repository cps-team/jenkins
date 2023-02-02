class Company {
    constructor(code, name, desc, visible, time) {
        this.Code = code;
        this.Name = name;
        this.Desc = desc;
        this.Visible = visible;
        this.Time = time;
        this.Users = [];
        this.Factories = [];
    }

    GetCode() {
        return this.Code;
    }
    SetCode(code) {
        this.Code = code;
    }

    GetName() {
        return this.Name
    }
    SetName(name) {
        this.Name = name;
    }

    GetDesc() {
        return this.Name
    }
    SetDesc(desc) {
        this.Desc = desc;
    }

    GetVisible() {
        return this.Name
    }
    SetVisible(visible) {
        this.Visible = visible;
    }

    GetTime() {
        return this.Name
    }
    SetTime(time) {
        this.Time = time;
    }

    GetUsers() {
        return this.Users;
    }

    GetFactories() {
        return this.Factories;
    }
}

module.exports.Company = Company;