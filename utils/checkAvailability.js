

export const checkAvailability = (availableTimes) => {
     // Get the current time
     const currentTime = new Date();
     const currentHour = currentTime.getHours();
     const currentMinute = currentTime.getMinutes();
 
     // Convert current time to total minutes since midnight
     const currentTimeInMinutes = currentHour * 60 + currentMinute;
 
     // Loop through each availability interval
     for (const slot of availableTimes || []) {
         if (!slot || typeof slot !== "object" || !slot.start || !slot.end) {
             console.error("Invalid slot format:", slot);
             continue;
         }
 
         // Get start and end times correctly
         const [startHour, startMinute] = slot.start.split(":").map(Number);
         const [endHour, endMinute] = slot.end.split(":").map(Number);
 
         const startTime = startHour * 60 + startMinute;
         const endTime = endHour * 60 + endMinute;
 
         // Check if current time falls within this interval
         if (currentTimeInMinutes >= startTime && currentTimeInMinutes < endTime) {
             return true; // Current time is within this interval
         }
     }
 
     // If no interval matches, return false
     return false;
  };