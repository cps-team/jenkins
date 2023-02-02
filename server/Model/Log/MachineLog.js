class MachineLog {
    constructor(time, itemName, itemValue, itemType) {
        this.Time = time;
        this.ItemName = itemName;
        this.ItemValue = itemValue;
        this.ItemType = itemType;
    }

    GetTime() {
        return this.Time;
    }
    SetTime(time) {
        this.Time = time;
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
}

module.exports.MachineLog = MachineLog;