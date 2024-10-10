import { IUtility } from './IUtility';

export abstract class AbstractUtility implements IUtility {
    abstract numTokandM(numString: string | number): string | number;
    abstract getDate(date: number | string, fullDay?: string): string;
    abstract getTimeDifference(targetDate: string): string;
    abstract getLastMonths(monthCount: number): string[];
    abstract getDatesOfCurrentYear(arrayOfDays: string[]): string[];
    abstract generateOtp(digit: number): number | string;
    abstract xKeyGenerator(length: string | number): string;
    abstract isLeapYear(year: string | number): boolean;
    abstract isEndCentury(year: string | number): boolean;
    abstract dayDifference(dateStr1: string, dateStr2: string): number | null;
    abstract getDay(dateStr: string): string;
    abstract daysOfYear(dateStr: string | Date): number;
    abstract retryPromise(fn: any, retry?: number, delay?: number): any
    abstract validateEmail(email: string): boolean;
    abstract validatePassword(password: string): boolean;
    abstract validatePhone(Phone: string): boolean;
    abstract validateName(Name: string): boolean;
    abstract validateFullName(FullName: string): boolean;
    abstract validateURL(url: string): boolean
    abstract validateCreditCard(cardNumber: string): boolean
    abstract validateIPV4(ip: string): boolean
    abstract validateDate(date: string): boolean
    abstract validateHexColor(color: string): boolean
    abstract validateMACAddress(mac: string): boolean
    abstract validateIPv6(ipv6: string): boolean
    abstract validateUUID(uuid: string): boolean
    abstract validateCreditCardCVV(cvv: string): boolean
    abstract validateLatitude(latitude: string): boolean
    abstract validateLongitude(longitude: string): boolean
    abstract validateHTMLTag(tag: string): boolean
    abstract validateCountryCode(code: string): boolean
    abstract validatePassportNumber(passport: string): boolean
    abstract validateBinary(binary: string): boolean
    abstract validateYouTubeURL(url: string): boolean
    abstract validateMongoObjectId(id: string): boolean
    abstract formatDate(date: Date): string
    abstract getRelativeTime(date: Date): string
    abstract camelToSnake(str: string): string
    abstract snakeToCamel(str: string): string
    abstract generatePort(): Promise<number>
}
