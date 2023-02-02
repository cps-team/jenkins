class Block {
    constructor(code, name, desc, visible, time) {
        this.Code = code;
        this.Name = name;
        this.Desc = desc;
        this.Visible = visible;
        this.Time = time;
        this.Districts = [];
    }

    GetCode() {
        return this.Code
    }
    SetCode(code) {
        this.Code = code;
    }

    GetName() {
        return this.Name;
    }
    SetName(name) {
        this.Name = name;
    }

    GetDesc() {
        return this.Desc;
    }
    SetDesc() {
        this.Desc = desc;
    }

    GetVisible() {
        return this.Visible;
    }
    SetVisible() {
        this.Visible = visible;
    }

    GetTime() {
        return this.Time;
    }
    SetTime() {
        this.Time = time;
    }

    GetDistricts() {
        return this.Districts;
    }
}

module.exports.Block = Block;