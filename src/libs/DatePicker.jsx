import React, { useState } from "react";
const today = new Date();

const TimeStamp = () => {
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = ("0" + today.getDate()).slice(-2); // 날짜
    let hours = ("0" + today.getHours()).slice(-2); // 시(“0” + today.getDate()).slice(-2)
    let minutes = ("0" + today.getMinutes()).slice(-2); // 분("0" + today.getMinutes()).slice(-2)
    let seconds = today.getSeconds(); // 초
    const timeStamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return timeStamp;
};

export default TimeStamp;
