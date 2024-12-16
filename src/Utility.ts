import { AbstractUtility } from './AbstractUtility';
import * as net from 'net';


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
        if (!digit || isNaN(digit) || digit < 1) { return "Invalid digits" }
        const otp = this.padStart(this.numGenerator(digit).toString(), digit, this.numGenerator(1).toString())
        return otp[0] === '0' ? this.generateOtp(digit) : Number(otp);
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

    public formatDate(date: Date): string {
        try {
            const d = date.getDate().toString().padStart(2, '0');
            const m = (date.getMonth() + 1).toString().padStart(2, '0');
            const y = date.getFullYear();
            return `${d}-${m}-${y}`;
        } catch (error: any) {
            console.log(error.message ?? "Please send a valid date")
            return "Please send a valid date"
        }
    };

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

    public getRelativeTime(date: Date): string {
        try {
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 60) return `${diffMins} minute(s) ago`;
            if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hour(s) ago`;
            return `${Math.floor(diffMins / 1440)} day(s) ago`;
        } catch (error: any) {
            console.log(error.message ?? "Enter a valid date")
            return "Enter a valid date"
        }
    };

    public camelToSnake(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    public snakeToCamel(str: string): string {
        return str.toLowerCase().replace(/(_\w)/g, match => match[1].toUpperCase());
    }

    public isPortAvailable(port: number): Promise<boolean> {
        if (typeof port === 'number' && port < 79 && port > 65535) {
            console.error("Please enter a valid port number greater than 79")
            return Promise.resolve(false)
        }
        return new Promise(resolve => {
            const server = net.createServer();
            server.once('error', (err: any) => resolve(false));

            server.once('listening', () => {
                server.close();
                resolve(true);
            });

            server.listen(port);
        });
    }

    public async generatePort(): Promise<number> {
        const minPort = 1000;
        const maxPort = 65535;
        const port = Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
        if (await this.isPortAvailable(port)) {
            return port
        } else {
            return await this.generatePort()
        }
    }


    public validateName = (Name: string) => /^(?=.*[a-zA-Z]).{3,}$/.test(Name.trim())
    public validateFullName = (FullName: string) => /^(?=.*[ _]).{6,}$/.test(FullName.trim());
    public validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
    public validatePassword = (password: string) => /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(password.trim())
    public validatePhone = (Phone: string) => /^[1-9]\d{9}$/.test(Phone.trim());
    public validateURL = (url: string) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url);
    public validateCreditCard = (cardNumber: string) => /^\d{13,19}$/.test(cardNumber);
    public validateIPV4 = (ip: string) => /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
    public validateDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);
    public validateHexColor = (color: string) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color);
    public validateMACAddress = (mac: string) => /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
    public validateIPv6 = (ipv6: string) => /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:))|(([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:))|(([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:))|(([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:))|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6}|:)|(:((:[0-9a-fA-F]{1,4}){1,7}|:))$/.test(ipv6);
    public validateUUID = (uuid: string) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
    public validateCreditCardCVV = (cvv: string | number) => /^\d{3,4}$/.test(cvv + "");
    public validateLatitude = (latitude: string) => /^(-?[1-8]?[0-9](\.\d+)?|90(\.0+)?)$/.test(latitude);
    public validateLongitude = (longitude: string) => /^(-?(1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)$/.test(longitude);
    public validateHTMLTag = (tag: string) => /^<\/?[a-z][a-z0-9]*[^<>]*>$/i.test(tag);
    public validateCountryCode = (code: string) => /^\+\d{1,3}$/.test(code);
    public validatePassportNumber = (passport: string) => /^[a-zA-Z0-9]{6,9}$/.test(passport);
    public validateBinary = (binary: string) => /^[01]+$/.test(binary);
    public validateYouTubeURL = (url: string) => /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url);
    public validateMongoObjectId = (id: string) => /^[a-fA-F0-9]{24}$/.test(id);

}















