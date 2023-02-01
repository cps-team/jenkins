class DistrictLog {
    constructor(time, itemName, itemValue) {
        this.Time = time;
        this.ItemName = itemName;
        this.ItemValue = itemValue;
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
}

module.exports.DistrictLog = DistrictLog;