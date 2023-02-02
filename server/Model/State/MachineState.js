class MachineState {
    constructor(code, name, type, itemName, itemValue, itemType, desc, time) {
        this.Code = code;
        this.Name = name;
        this.Type = type;
        this.ItemName = itemName;
        this.ItemValue = itemValue;
        this.ItemType = itemType;
        this.Desc = desc;
        this.Time = time;
    }

    GetCode() {
        return this.Code;
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

    GetItemName() {
        return this.ItemName;
    }
    SetItemName(itemName) {
        this.ItemName = itemName;
    }

    GetItemValue() {
        return this.ItemValue;
    }
    SetItemValue(itemValue) {
        this.ItemValue = itemValue;
    }

    GetItemType() {
        return this.ItemType;
    }
    SetItemType(itemType) {
        this.ItemType = itemType;
    }

    GetDesc() {
        return this.Desc;
    }
    SetDesc(desc) {
        this.Desc = desc;
    }

    GetTime() {
        return this.Time;
    }
    SetTime(time) {
        this.Time = time;
    }
}

module.exports.MachineState = MachineState;