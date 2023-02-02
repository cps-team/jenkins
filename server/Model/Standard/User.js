class User {
    constructor(account, name, time) {
        this.Account = account;
        this.Name = name;
        this.Time = time;
    }

    GetAccount() {
        return this.Account;
    }
    SetAccount(account) {
        this.Account = account;
    }

    GetName() {
        return this.Name;
    }
    SetName(name) {
        this.Name = name;
    }

    GetTime() {
        return this.Time;
    }
    SetTime(time) {
        this.Time = time;
    }
}

module.exports.User = User;