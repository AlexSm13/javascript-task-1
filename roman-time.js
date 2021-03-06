'use strict';

/**
 * @param {String} time – время в формате HH:MM (например, 09:05)
 * @returns {String} – время римскими цифрами (IX:V)
 */
function romanTime(time) {
    errorChecking(time);
    let partOfTime = time.split(':');
    let hour = getRoman(partOfTime[0]);
    let minute = getRoman(partOfTime[1]);
    time = hour + ':' + minute;

    return time;
}

function errorChecking(time) {
    let partOfTime = time.split(':');
    for (let i = 0; i < partOfTime.length; i++) {
        if (isNaN(parseInt(partOfTime[i])) || parseInt(partOfTime[i]) < 0) {
            throw new TypeError('Неверное время');
        }
        if (parseInt(partOfTime[0]) > 23 || parseInt(partOfTime[1]) > 59) {
            throw new TypeError('Неверное время');
        }
    }
}

function getRoman(partOfTime) {
    let timeRoman = '';
    if (partOfTime >= 50) {
        timeRoman += 'L';
        timeRoman = getTens(timeRoman, partOfTime % 50);
    } else if (partOfTime >= 40 && partOfTime < 50) {
        timeRoman += 'XL';
        timeRoman = getTens(timeRoman, partOfTime % 40);
    } else if (partOfTime < 40) {
        for (let i = 1; i <= partOfTime / 10; i++) {
            timeRoman += 'X';
        }
        timeRoman = getTens(timeRoman, partOfTime % 10);
    }
    timeRoman = checkNull(partOfTime, timeRoman);

    return timeRoman;
}

function getTens(romeTime, tens) {
    if (tens === 9) {
        romeTime += 'IX';
    } else if (tens === 4) {
        romeTime += 'IV';
    } else if (tens / 5 >= 1) {
        romeTime += 'V';
        for (let i = 0; i < tens % 5; i++) {
            romeTime += 'I';
        }
    } else {
        for (let k = 0; k < tens; k++) {
            romeTime += 'I';
        }
    }

    return romeTime;
}

function checkNull(numb, rom) {
    if (Number(numb) - Math.floor(numb) !== 0) {
        throw new TypeError('Неверное время');
    }
    if (parseInt(numb) === 0) {
        return 'N';
    }

    return rom;
}

module.exports = romanTime;
