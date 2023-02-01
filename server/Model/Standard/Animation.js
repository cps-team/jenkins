class Animation {
    constructor(code, desc, frameRate, time) {
        this.Code = code;
        this.Desc = desc;
        this.FrameRate = frameRate;
        this.Time = time;
    }

    GetCode() {
        return this.Code;
    }
    SetCode(code) {
        this.Code = code;
    }

    GetDesc() {
        return this.Desc;
    }
    SetDesc(desc) {
        this.Desc = desc;
    }

    GetFrameRate() {
        return this.FrameRate;
    }
    SetFrameRate(frameRate) {
        this.FrameRate = frameRate;
    }

    GetTime() {
        return this.Time;
    }
    SetTime(time) {
        this.Time = time;
    }


}

module.exports.Animation = Animation;