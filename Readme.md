# Util Functions

Util functions provides you functions that helps you to do functionality in your project.

Correct format of using the package, you cannot destructure the functions.

### Correct Format

![Correct Format](https://res.cloudinary.com/dyh7c1wtm/image/upload/v1723738938/crct_ad6khn.png)

### Incorrect Format

![Incorrect Format](https://res.cloudinary.com/dyh7c1wtm/image/upload/v1723738938/notCrct_xvmfwe.png)

Functions are:

1. **numTokandM**

   This method has a single parameter which receives numbers or strings that include numbers and returns the value. For example:
   
   - If you pass "1500" then it returns "1.5k", so 1500 -> 1.5k
   - If it is "15,000" then 15k, so 15000 -> 15k
   - This "1000000" to 1m so, 1000000 -> 1M

2. **getTimeDifference**

   This method also has a single parameter which receives a string and you must pass a future date. It will print how many years, months, days, hours, and minutes have passed. For example:
   
   - If you pass "2025-05-14" then "10 months 329 days 18 hours 11 minutes" will be the output.
   
   Note: Pass the string in this format year-month-day.

3. **getDate**

   This method has 1-2 parameters. The first parameter includes a number or string which is the number of days. If you don't provide the 2nd parameter, it will add the days to the current date. If the first parameter is a negative value, it will subtract. The second parameter receives a date and if it is included, it will add the days to the given date. For example:
   
   - If the current date is "2024-06-18" and the first parameter is 365, then it returns "2025-06-18".
   - If the current date is "2024-06-18" and the first parameter is -365, then it returns "2023-06-19".
   - If you give like getDate(-5, "2024-01-10") then it returns "2024-01-05".
   - If you give like getDate(5, "2024-01-10") then it returns "2024-01-15".

4. **getNDates**

    This method have 2 parameters. One is date typeof string and second one is number. This method returns an array of string of date which calculates based on the second parameter. For example:

    - If the first parameter date is 2024-12-27 and second parameter number is 7
     [ '2024-12-28', '2024-12-29', '2024-12-3 '2024-12-31', '2025-01-01', '2025-01-02'. '2025-01-03' ]
    
    - If the first parameter date is 2024-12-27 and second parameter number is -7
     [ 2024-12-20, 2024-12-21, 2024-12-22, 2024-12-23, 2024-12-24, 2024-12-25, 2024-12-26 ]

4. **getLastMonths**

   This method has one parameter which receives a number or string that includes only numbers and returns the last N months from the current month as an array. For example:
   
   - If the input is 12 then it will return the last 12 months.
   - getLastMonths(12) -> returns [ 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June' ]
   
   You cannot give a negative value. If you do, it returns [].

5. **getDatesOfCurrentYear**

   As the name suggests, it receives an array of strings and returns the dates if the date is in the current year. For example:
   
   - If the input array is ["2025-04-08", "2024-04-10", "2025-12-12", "2024-04-08", "2024-08-08"], then it returns [ '2024-04-10', '2024-04-08', '2024-08-08' ].
   
   The return array only includes the dates in the current year.

6. **generateOtp**

   This function generates an OTP based on the number of digits you provide. It is always unique and can be used for generating OTPs. It needs one argument to call the function and it returns the number of digits. For example:
   
   - generateOtp(4) returns 1260
   - generateOtp(6) returns 252000
   
   Note: No leading zero in the generated OTP.

7. **xKeyGenerator**

   This function generates a key of the length given and returns it. It includes alphabetic characters and special characters except (Double quote), (Single quote), (Opening parenthesis), (Closing parenthesis), (Asterisk), (Comma), (Period), (Slash), (Colon), (Semicolon), (Less than), (Greater than), (Opening square bracket), (Backslash), (Closing square bracket), (Caret), (Backtick), (Tilde).

8. **isEndCentury**

   This function takes one parameter as a string or number and returns if the year is the end of the century. The string must only contain numbers. For example:
   
   - isEndCentury(2000) returns true
   - isEndCentury(1905) returns false

9. **isLeapYear**

   As the name of the function suggests, it finds if the input year is a leap year or not. For example:
   
   - isLeapYear(2024) returns true
   - isLeapYear(1900) returns false
   
   If any NaN values are sent like isLeapYear("YEAR"), it will throw "Invalid digits" as we can't calculate that.

10. **dayDifference**

    This function is meant for finding the difference in days between two dates. For example:
    
    - When you pass dayDifference("08-31-2005", "08-16-2005") it returns 15. It will only return the absolute value.
    
    Note: Date must be in the format MM-DD-YYYY.

11. **getDay**

    This function returns the day of the date. For example:
    
    - If the date is 30-06-2024 then it is Sunday. Pass the argument as MM-DD-YYYY.

12. **daysOfYear**

    This function returns how many days of the year have been completed. If it is a leap year, then February is considered.

13. **retryPromise**

    This function helps you to retry promises if needed. You can pass an async function and other optional arguments. One is the count of retries (default is three) and the time needed to retry in milliseconds. For example:
    
    - retryPromise(fn: any, retry: number = 3, delay: number = 1000)
    
    It will call the function 3 times and return your result if you do not pass the number of retries in every second.

14. **validateEmail**

    As the name of the function suggests, it is to validate the email. In web development, validations are very important. Some common validations are added in the package for the form. All the validations are each function like validate email, password, phone number, and name, etc. You need to pass your email in the function and it will return true if it is valid, otherwise false.

15. **validatePassword**

    To validate the password, 1 argument and boolean return.

16. **validatePhone**

    To validate the phone number, 1 argument and boolean return.

17. **validateName**

    To validate the name, 1 argument and boolean return.

18. **validateFullName**

    To validate the full name, 1 argument and boolean return.

19. **Other validations**

    - validateURL
    - validateCreditCard
    - validateIPV4
    - validateDate
    - validateHexColor
    - validateMACAddress
    - validateIPv6
    - validateUUID
    - validateCreditCardCVV
    - validateLatitude
    - validateLongitude
    - validateHTMLTag
    - validateCountryCode
    - validatePassportNumber
    - validateBinary
    - validateYouTubeURL
    - validateMongoObjectId

20. **formatDate**

    Send your date here and it will update the string and return back.

21. **getRelativeTime**

22. **camelToSnake and snakeToCamel**

    These functions convert the text to both camel case and snake case. We all know that in JS camel case is the standard way of coding and in Python, we mostly use snake case. In both functions, we can convert from one style to another.

23. **generatePort**

    This function generates a port number in the range between 1000 and 65536 and it will check if the port is available in the system or already allocated by any program. Just call this function and it will return a port number.

24. **isPortAvailable**

    This function checks whether the given port number is available or not in your system. You need to send a port number in the range 79 and 65535. For example:
    
    - const available = await isPortAvailable(4000) returns true or false.

The package name is util-functions and the functions that I created are from the problems that I have faced. It will have updates in the future and if you have any suggestions or errors occur, then contact me at this email:

"alannixon2520@gmail.com". If you have any problems, then share them with me. I will try to add the functions to my package.til Functions
