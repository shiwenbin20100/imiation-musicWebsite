export function formatTime(second) {
    return [
        parseInt(second / 60 / 60),
        parseInt(second / 60 % 60),
        parseInt(second % 60)
    ].join(":").replace(/\b(\d)\b/g,"0$1").substring(3)
}

export function formatTimeToSeconds(time) {
    let temp = time.substring(1,time.length-1).split(":");
    return (parseFloat(temp[0]*60) + parseFloat(temp[1])).toFixed(2);
}

export function getAbsLeft(obj,leftVal) {
    "use strict";
    return !!obj.parentNode.offsetLeft?getAbsLeft(obj.parentNode,obj.parentNode.offsetLeft + leftVal):leftVal;
}

