import { AbstractUtility } from './AbstractUtility';



export class Utility extends AbstractUtility {
    private daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    private monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    private getRandomAsciiValue(): number {
        const min = 33;
        const max = 122;
        const bannedNums = [34, 39, 40, 41, 42, 44, 46, 47, 58, 59, 60, 62, 91, 92, 93, 94, 96, 126];
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!bannedNums.includes(value)) {
            return value;
        }
        return this.getRandomAsciiValue();
    }

    private removeExtraDecimals(inputString: string): string {
        let decimalPosition = inputString.indexOf('.');
        if (decimalPosition === -1 || decimalPosition === inputString.length - 1 || Number(inputString) > 10) {
            return Math.floor(parseFloat(inputString)).toString();
        }
        return inputString.slice(0, decimalPosition + 2);
    }

    private padStart(str: string, targetLength: number, padString: string = '0'): string {
        while (str.length < targetLength) {
            str = padString + str;
        }
        return str;
    }

    private numGenerator(val: number): number {
        const num = Math.floor(Math.random() * Math.pow(10, val));
        if (num.toString().length < val) {
            return this.numGenerator(val);
        } else {
            return num;
        }
    }

    private parseDate(dateStr: string): Date {
        const [month, day, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    public numTokandM(numString: string | number): string | number {
        try {
            const number = Number(numString);
            if (number > 999 && number < 1000000) {
                return this.removeExtraDecimals((number / 1000).toString()) + "k";
            } else if (number >= 1000000) {
                return this.removeExtraDecimals((number / 1000000).toString()) + "M";
            } else {
                return numString;
            }
        } catch (error: any) {
            console.log(error?.message ?? "Error while converting");
            return "Invalid Input"
        }
    }

    public getDate(date: number | string, fullDay?: string): string {
        try {
            date = Number(date);
            let currentDate: Date;
            if (!fullDay) {
                currentDate = new Date();
            } else {
                currentDate = new Date(fullDay);
                if (isNaN(currentDate.getTime())) {
                    console.error(`Invalid date format: ${fullDay}`);
                    return "Invalid date";
                }
            }

            currentDate.setDate(currentDate.getDate() + date);
            const month = this.padStart(String(currentDate.getMonth() + 1), 2, '0');
            const day = this.padStart(String(currentDate.getDate()), 2, '0');
            const year = currentDate.getFullYear();

            if (isNaN(year) || isNaN(parseInt(month)) || isNaN(parseInt(day))) {
                console.error(`Date calculation resulted in NaN: year=${year}, month=${month}, day=${day}`);
                return "Invalid date";
            }
            return `${year}-${month}-${day}`;
        } catch (error: any) {
            console.log(error.message ?? "Error occurred while getting date");
            return "null";
        }
    }

    public getTimeDifference(targetDate: string): string {
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
            console.log(error?.message ?? "Error occurred while getting time");
            return "Invalid Input"
        }
    }

    public getLastMonths(monthCount: number): string[] {
        try {
            let currentDate = new Date().getMonth();
            monthCount -= 1;
            const lastMonths: string[] = [];
            while (monthCount > -1) {
                lastMonths.push(this.monthNames[currentDate]);
                currentDate--;
                monthCount--;
                if (currentDate < 0) {
                    currentDate = 11;
                }
            }
            return lastMonths.reverse();
        } catch (error: any) {
            console.log(error.message ?? "Error occurred while getting months");
            return [];
        }
    }

    public getDatesOfCurrentYear(arrayOfDays: string[]): string[] {
        try {
            const currentYear = new Date().getFullYear();
            const filteredArray = arrayOfDays.filter(item => {
                const dateYear = new Date(item).getFullYear();
                return dateYear <= currentYear;
            });
            return filteredArray;
        } catch (error: any) {
            console.log(error.message ?? "Error occurred while getting dates");
            return [];
        }
    }

    public generateOtp(digit: number): number | string {
        if (!digit || isNaN(digit)) {
            return "Invalid digits";
        }
        return Number(this.padStart(this.numGenerator(digit).toString(), digit, this.numGenerator(1).toString()));
    }

    public xKeyGenerator(length: string | number): string {
        try {
            let KEY = "";
            length = Number(length);
            if (length < 1 || isNaN(length)) {
                return "Invalid Length";
            }
            for (let i = 0; i < length; i++) {
                KEY += String.fromCharCode(this.getRandomAsciiValue());
            }
            return KEY;
        } catch (error: any) {
            console.log(error?.message ?? "Error while generating key generator");
            return "Invalid Length";
        }
    }

    public isLeapYear(year: string | number): boolean {
        const yr = Number(year);
        if (isNaN(yr) || yr <= 0) {
            console.error("Invalid Input");
            return false;
        }
        return yr % (this.isEndCentury(yr) ? 400 : 4) === 0;
    }

    public isEndCentury(year: string | number): boolean {
        const num = Number(year);
        if (isNaN(num)) {
            console.error("Invalid Input");
            return false;
        }
        return num % 100 === 0;
    }

    public dayDifference(dateStr1: string, dateStr2: string): number | null {
        try {
            const date1 = this.parseDate(dateStr1);
            const date2 = this.parseDate(dateStr2);

            const timeDifference = date2.getTime() - date1.getTime();
            const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
            return Math.abs(dayDifference);
        } catch (error: any) {
            console.log(error.message ?? "Pass date in format MM-DD-YYYY");
            return null;
        }
    }

    public getDay(dateStr: string): string {
        return this.daysOfWeek[this.parseDate(dateStr).getDay()];
    }

    public daysOfYear(dateStr: string | Date): number {
        try {
            const date: Date = new Date(dateStr);
            let days = 0;
            const datesInMonth = [31, this.isLeapYear(date.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (date.getMonth() !== 0) {
                days = datesInMonth.reduce((acc, curr, idx) => (idx < date.getMonth()) ? acc + curr : acc + 0, 0);
            }
            return days + date.getDate();
        } catch (error: any) {
            console.log(error.message ?? "Please input a valid date");
            return -1;
        }
    }

    public retryPromise(fn: any, retry: number = 3, delay: number = 1000) {
        try {
            return new Promise((resolve, reject) => {
                const attempt = () => {
                    fn().then(resolve).catch((error: any) => {
                        if (retry === 0) { reject(error); }
                        else { setTimeout(() => { retry--; attempt(); }, delay) }
                    });
                };
                attempt();
            })
        } catch (error: any) {
            console.log(error.message ?? "Please input a valid date");
        }
    }
    
}