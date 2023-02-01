class FactoryState {
    constructor(itemName, itemValue, desc, time) {
        this.ItemName = itemName;
        this.ItemValue = itemValue;
        this.Desc = desc;
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

module.exports.FactoryState = FactoryState;