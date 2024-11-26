export const truncate = (str, maxLength) => {
  // Check if the string length exceeds the maximum length
  if (str.length > maxLength) {
    // Return the truncated string with ellipsis
    return str.slice(0, maxLength - 3) + "...";
  }
  // Return the original string if it's within the limit
  return str;
};

// Example usage:
// const originalString = "This is a long string that needs to be truncated.";
// const truncatedString = truncate(originalString, 30);
// console.log(truncatedString); // Output: "This is a long string that..."
