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


function timestampToEnglishDateWithTime(timestamp: number): string {
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
}

export default timestampToEnglishDateWithTime;
