class District {
    constructor(code, name, url, desc, visible, time, img) {
        this.Code = code;
        this.Name = name;
        this.Url = url;
        this.Desc = desc;
        this.Visible = visible;
        this.Time = time;
        this.Img = img
        this.Machines = [];
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

    GetUrl() {
        return this.Url;
    }
    SetUrl(url) {
        this.Url = url;
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

    GetImg() {
        return this.Img;
    }
    SetTime(img) {
        this.Img = img;
    }

    GetMachines() {
        return this.Machines;
    }
}

module.exports.District = District;