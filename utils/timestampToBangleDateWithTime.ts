// function timestampToBangleDateWithTime(timestamp: number) {
//   // Convert to milliseconds
//   const date = new Date(timestamp * 1000);

//   // Convert options
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: false,
//     numberingSystem: "eng",
//     calendar: "eng",
//   };

//   const formattedDate: string = new Intl.DateTimeFormat(
//     "bn-BD-u-ca-beng",
//     options
//   ).format(date);

//   return formattedDate;
// }

// export default timestampToBangleDateWithTime;

import moment from "moment";

function timestampToBanglaDateWithTime(timestamp: number): string {
  moment.locale('bn');
  const output = moment.unix(timestamp).format('dddd, Do MMMM YYYY | a h:mm মিনিট');
  return output;
}


function timestampToEnglishDateWithTime(timestamp: number): string {

  return timestampToBanglaDateWithTime(timestamp);

  /* only Bangla support

  // Convert to milliseconds
  const date = new Date(timestamp * 1000);

  // Convert options
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Use 24-hour time
    numberingSystem: "latn", // Latin numerals
  };

  const formattedDate: string = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date);

  return formattedDate;
  */

}

export default timestampToEnglishDateWithTime;
