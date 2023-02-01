class UserLog {
    constructor(time, logType, account) {
        this.Time = time;
        this.LogType = logType;
        this.Account = account;
    }

    GetTime() {
        return this.Time;
    }
    SetTime(time) {
        this.Time = time
    }

    GetLogType() {
        return this.LogType;
    }
    SetLogType(logType) {
        this.LogType = logType;
    }

    GetAccount() {
        return this.Time;
    }
    SetAccount(account) {
        this.Account = account;
    }
}

module.exports.UserLog = UserLog;