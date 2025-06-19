export const passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const panNumberRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const aadharCardReges = /^\d{12}$/;
export const gstInNumberRegex =  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const emailWithInvalidDominRegex = /^(?!.*@(usha\.com|ushainternational\.com)$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const mobileNumberRegex = /^[6-9]\d{9}$/;
export const foreginNumberRegex = /^[0-9-]+$/;
export const accountNumberRegex = /^[0-9]{9,18}$/;
// export const ifscCodeRegex = /^[a-zA-Z0-9]+$/;
export const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const msmeRegex = /^UDYAM-[A-Z]{2}-\d{2}-\d+$/;
export const nameRegex = /^[A-Za-z0-9 &.\-\(\)\/\_\,\']*$/;
export const capitalLettarOnly = /^[A-Z0-9 ]*$/;
export const addressRegex = /^[a-zA-Z0-9\s,.'\-&:\/]*$/;
export const cityRegex = /^[a-zA-Z0-9\s]*$/;
export const postalCodeRegex = /^[0-9]{0,7}$/;
export const postalCodeRangeRegex = /^[0-9\-]*$/; 
export const postalCodeRangeForgienRegex = /^[a-zA-Z0-9\-]*$/; 
export const telephoneRegex = /^0[0-9]{1,4}-?[0-9]{6,8}$/;
export const invalidDomains = ["usha.com","ushainternational.com"];
export const contactPersonRegex = /^[A-Za-z0-9\-_\. ]*$/;
export const accountAssignmentRegex =  /^[a-zA-Z0-9_]{0,50}$/;
export const areaSalesOfficeRegex = /^[a-zA-Z0-9\s'-]{0,50}$/;
export const deliveryPlanRegex =  /^[a-zA-Z0-9]{0,50}$/;
export const panAvailableRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
export const usernameRegex = /^[a-zA-Z0-9_]*$/;
export const numberDecimalRegex = /^\d*\.?\d*$/;
export const taxTypeCodeRegex = /^[a-zA-Z0-9\-\.%\/]+$/;
export const onlyAlphaRegex = /^[a-zA-Z\s]*$/;
export const employCodeReges = /^T\d*$/



export  const invalidPostalCodes = [
    "123456", "234567", "456789",
    "012345", "111111", "222222",
    "333333", "444444", "555555",
    "666666", "777777", "888888",
    "999999", "000000","0"
  ];
  

  export  const invalidPhoneNumbers = [
    "1111111111", "0000000000", "1234567890",
    "2222222222", "3333333333", "4444444444",
    "5555555555", "6666666666", "7777777777",
    "8888888888", "9999999999", "0",
    "1", "2"
  ];

  export  const invalidTelephoneNumbers = [
    "1111111111", "0000000000", "1234567890",
    "2222222222", "3333333333", "4444444444", 
    "5555555555", "6666666666", "7777777777",
    "8888888888", "9999999999"
  ];



  export const formatUdyamNumber = (input:string) => {
    // let formatted = input.replace(/[^A-Z0-9-]/gi, '');
    let formatted = input.replace(/[^A-Z0-9]/gi, '');
    if (formatted.length > 5) {
      formatted = `${formatted.substring(0, 5)}-${formatted.substring(5)}`;
    }
    if (formatted.length > 8) {
      formatted = `${formatted.substring(0, 8)}-${formatted.substring(8)}`;
    }
    if (formatted.length > 11) {
      formatted = `${formatted.substring(0, 11)}-${formatted.substring(11)}`;
    }
    if (formatted.length > 19) {
      formatted = formatted.substring(0, 19);
    }
    return formatted.toUpperCase();
  };
  