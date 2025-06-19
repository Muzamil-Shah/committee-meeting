import { useEffect, useState } from "react";

const ExpiryCheck = (dateArray: number[]) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Given date array

    // Convert the array into a Date object
    const expiryDate = new Date(
      dateArray[0], // Year
      dateArray[1] - 1, // Month (0-based in JS)
      dateArray[2], // Day
      dateArray[3], // Hour
      dateArray[4], // Minute
      dateArray[5], // Second
      Math.floor(dateArray[6] / 1000) // Milliseconds (adjusted from nanoseconds)
    );

    // Get current date and time
    const now = new Date();

    // Compare the dates
    setIsExpired(now > expiryDate);
  }, []);

  return isExpired
  ;
};

export default ExpiryCheck;
