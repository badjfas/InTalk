import React, { useState } from "react";

const DatePicker = ({ id, className, value }) => {
    const date = new Date();
    const yearArr = [];
    const monthArr = [];
    const YearSelector = () => {
        var yearData = date.getFullYear();
        var count = 0;
        for (count = yearData - 100; count <= yearData; count++) {
            yearArr.push(count);
        }
    };
    const MonthSelector = () => {
        var count = 1;
        for (count; count <= 12; count++) {
            monthArr.push(count);
        }
    };

    const DaySelector = () => {
        yearArr.forEach(element => {
            if (element % 4 === 0) {
                if (element % 100 !== 0) {
                    console.log(element);
                }
            }
        });
    };
    YearSelector();
    MonthSelector();
    DaySelector();

    if (id === "year")
        return (
            <select id={id} className={className}>
                {yearArr.map((e, i) => {
                    return (
                        <option key={i} id={i}>
                            {e}
                        </option>
                    );
                })}
            </select>
        );
    if (id === "month") {
        return (
            <select id={id} className={className}>
                {monthArr.map((e, i) => {
                    return (
                        <option key={i} id={i}>
                            {e}월
                        </option>
                    );
                })}
            </select>
        );
    }
};

export default DatePicker;
