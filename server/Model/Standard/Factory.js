class Factory {
    constructor(code, name, address, latitude, longitude, desc, visible, time) {
        this.Code = code;
        this.Name = name;
        this.Address = address;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Desc = desc;
        this.Visible = visible;
        this.Time = time;
        this.Blocks = [];
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

    GetAddress() {
        return this.Address;
    }
    SetAddress(address) {
        this.Address = address;
    }

    GetLatitude() {
        return this.Latitude;
    }
    SetLatitude() {
        this.Latitude = latitude;
    }

    GetLongitude() {
        return this.Longitude;
    }
    SetLongitude() {
        this.Longitude = longitude;
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

    GetBlocks() {
        return this.Blocks;
    }
}

module.exports.Factory = Factory;