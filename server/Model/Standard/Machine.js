class Machine {
    constructor(code, name, type, desc, visible, time) {
        this.Code = code;
        this.Name = name;
        this.Type = type;
        this.Desc = desc;
        this.Visible = visible;
        this.Time = time;
        this.Animations = [];
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

    GetType() {
        return this.Type;
    }
    SetType(type) {
        this.Type = type;
    }

    GetDesc() {
        return this.Desc;
    }
    SetDesc(desc) {
        this.Desc = desc;
    }

    GetVisible() {
        return this.Visible;
    }
    SetVisible(visible) {
        this.Visible = visible;
    }

    GetTime() {
        return this.Time;
    }
    SetTime(time) {
        this.Time = time;
    }

    GetAnimations() {
        return this.Animations;
    }
}

module.exports.Machine = Machine;