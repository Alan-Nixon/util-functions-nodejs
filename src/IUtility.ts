export interface IUtility {
    numTokandM(numString: string | number): string | number;
    getDate(date: number | string, fullDay?: string): string;
    getTimeDifference(targetDate: string): string;
    getNDates(date: string, n: number): string[];
    getLastMonths(monthCount: number): string[];
    getDatesOfCurrentYear(arrayOfDays: string[]): string[];
    generateOtp(digit: number): number | string;
    xKeyGenerator(length: string | number): string;
    isLeapYear(year: string | number): boolean;
    isEndCentury(year: string | number): boolean;
    dayDifference(dateStr1: string, dateStr2: string): number | null;
    getDay(dateStr: string): string;
    daysOfYear(dateStr: string | Date): number;
    retryPromise(fn: any, retry: number, delay: number): any;
    validateEmail(email: string): boolean
    validatePassword(password: string): boolean
    validatePhone(Phone: string): boolean
    validateName(Name: string): boolean
    validateFullName(FullName: string): boolean
    validateURL(url: string): boolean
    validateCreditCard(cardNumber: string): boolean
    validateIPV4(ip: string): boolean
    validateDate(date: string): boolean
    validateHexColor(color: string): boolean
    validateMACAddress(mac: string): boolean
    validateIPv6(ipv6: string): boolean
    validateUUID(uuid: string): boolean
    validateCreditCardCVV(cvv: string): boolean
    validateLatitude(latitude: string): boolean
    validateLongitude(longitude: string): boolean
    validateHTMLTag(tag: string): boolean
    validateCountryCode(code: string): boolean
    validatePassportNumber(passport: string): boolean
    validateBinary(binary: string): boolean
    validateYouTubeURL(url: string): boolean
    validateMongoObjectId(id: string): boolean;
    formatDate(date: Date): string
    getRelativeTime(date: Date): string
    camelToSnake(str: string): string
    snakeToCamel(str: string): string
    generatePort(): Promise<number>
    isPortAvailable(port: number):Promise<boolean>
}

