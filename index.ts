// helpers
function getRandomAsciiValue() {
    const min = 33; const max = 122;
    const banedNum = [34, 39, 40, 41, 42, 44, 46, 47, 58, 59, 60, 62, 91, 92, 93, 94, 96, 126]
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!banedNum.includes(value)) { return value; }
    return getRandomAsciiValue()
}

function removeExtraDecimals(inputString: string) {
    let decimalPosition = inputString.indexOf('.');
    if (decimalPosition === -1 || decimalPosition === inputString.length - 1 || Number(inputString) > 10) {
        return Math.floor(parseFloat(inputString)).toString();
    }
    return inputString.slice(0, decimalPosition + 2);
}

function padStart(str: string, targetLength: number, padString: string = '0'): string {
    while (str.length < targetLength) { str = padString + str; }
    return str;
}

function NumGenerator(val: number) {
    const num = Math.floor(Math.random() * Math.pow(10, val))
    if (num.toString().length < val) {
        return NumGenerator(val)
    } else {
        return num
    }
}

function parseDate(dateStr: string) {
    const [month, day, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

// functions

export const numTokandM = (numString: string | number) => {
    try {
        const number = Number(numString)
        if (number > 999 && number < 1000000) {
            return removeExtraDecimals((number / 1000).toString()) + "k"
        } else if (number >= 1000000) {
            return removeExtraDecimals((number / 1000000).toString()) + "M"
        } else {
            return numString
        }
    } catch (error: any) {
        console.log(error?.message ?? "Error while converting");

    }
}



export const getDate = (date: number | string, fullDay?: string): string => {

    try {
        date = Number(date); let currentDate: Date;
        if (!fullDay) { currentDate = new Date(); }
        else {
            currentDate = new Date(fullDay);
            if (isNaN(currentDate.getTime())) {
                console.error(`Invalid date format: ${fullDay}`);
                return "Invalid date";
            }
        }

        currentDate.setDate(currentDate.getDate() + date);
        const month = padStart(String(currentDate.getMonth() + 1), 2, '0');
        const day = padStart(String(currentDate.getDate()), 2, '0');
        const year = currentDate.getFullYear();

        if (isNaN(year) || isNaN(parseInt(month)) || isNaN(parseInt(day))) {
            console.error(`Date calculation resulted in NaN: year=${year}, month=${month}, day=${day}`);
            return "Invalid date";
        }
        return `${year}-${month}-${day}`;
    } catch (error: any) {
        console.log(error.message ?? "Error occured while getting date");
        return "null"
    }

};


export function getTimeDifference(targetDate: string) {
    try {
        const currentDate = new Date();
        const targetDateTime = new Date(targetDate).getTime();
        const currentTime = currentDate.getTime();
        const timeDifference = Math.abs(targetDateTime - currentTime);

        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 365);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        let timeString = '';

        if (years > 0) { timeString += years + (years === 1 ? ' year ' : ' years '); }
        if (months > 0) { timeString += months + (months === 1 ? ' month ' : ' months '); }
        if (days > 0) { timeString += days + (days === 1 ? ' day ' : ' days '); }
        if (hours > 0) { timeString += hours + (hours === 1 ? ' hour ' : ' hours '); }
        if (minutes > 0) { timeString += minutes + (minutes === 1 ? ' minute ' : ' minutes '); }

        return timeString.trim();
    } catch (error: any) {
        console.log(error?.message ?? "Error occured while getting time");

    }
}

export const getLastMonths = (monthCount: number) => {
    try {
        let currentDate = new Date().getMonth(); monthCount -= 1
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const lastMonths = []
        while (monthCount > -1) {
            lastMonths.push(monthNames[currentDate]);
            currentDate--
            monthCount--
            if (currentDate < 0) { currentDate = 11 }
        }
        return lastMonths.reverse()
    } catch (error: any) {
        console.log(error.message ?? "Error occured while getting months");

    }
}


export const getDatesOfCurrentYear = (arrayOfDays: string[]) => {
    try {
        const currentYear = new Date().getFullYear()
        const filteredArray = arrayOfDays.filter(item => {
            let dateYear = new Date(item).getFullYear()
            return dateYear <= currentYear
        })
        return filteredArray
    } catch (error: any) {
        console.log(error.message ?? "Error occured while getting dates");

    }
}

export const generateOtp = (digit: number) => {
    if (!digit || isNaN(digit)) { return "Invalid digits" }
    return Number(padStart(NumGenerator(digit) + "", digit, NumGenerator(1) + ""))
}

export const xKeyGenerator = (length: string | number): string => {
    try {
        let KEY = ""; length = Number(length);
        if (length < 1 || isNaN(length)) { return "Invalid Length" }
        for (let i = 0; i < length; i++) { KEY += String.fromCharCode(getRandomAsciiValue()) }
        return KEY
    } catch (error: any) {
        console.log(error?.message ?? "Error while generating key generator");
        return "Invalid Length"
    }
}

export const isLeapYear = (year: string | number): boolean => {
    const yr = Number(year);
    if (isNaN(yr) || yr <= 0) { console.error("Invalid Input"); return false }
    return yr % (isEndCentury(yr) ? 400 : 4) === 0
}

export const isEndCentury = (year: string | number): boolean => {
    const num = Number(year);
    if (isNaN(num)) {
        console.error("Invalid Input");
        return false;
    }
    return num % 100 === 0;
}

export const dayDifference = (dateStr1: string, dateStr2: string) => {
    try {
        const date1 = parseDate(dateStr1);
        const date2 = parseDate(dateStr2);

        const timeDifference = date2.getTime() - date1.getTime();
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
        return Math.abs(dayDifference)
    } catch (error: any) {
        console.log(error.message ?? "Pass date in format MM-DD-YYYY");
        return null
    }
}



export const getDay = (dateStr: string) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[parseDate(dateStr).getDay()];
}