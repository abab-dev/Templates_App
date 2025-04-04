import { Input } from "../../input";
import React from "react";

export default function InputStyleField({ label, value, onHandleStyleChange }) {
  // Safely format the value (e.g., "10px") into a number for the input field.
  // Returns an empty string if the value is invalid or results in NaN.
  const formattedValue = (value_) => {
    if (value_ === null || value_ === undefined) {
      return ''; // Handle null/undefined
    }
    // Use parseInt for whole numbers, base 10
    const num = parseInt(value_.toString().replace('px', ''), 10);
    return isNaN(num) ? '' : num; // Return empty string if NaN, otherwise the number
  };

  // Handle changes from the number input field.
  const handleInputChange = (event) => {
    const rawValue = event.target.value;
    if (rawValue === '') {
      // If input is cleared, maybe set to '0px' or handle as removal?
      // Setting to '0px' for now.
      onHandleStyleChange('0px');
    } else {
      const num = parseInt(rawValue, 10);
      // Only update if it's a valid number
      if (!isNaN(num)) {
        onHandleStyleChange(num + 'px');
      }
      // If input is invalid (e.g., "--"), do nothing to prevent bad state updates
    }
  };

  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div className='flex items-center'> {/* Use items-center for vertical alignment */}
        {/* Use type="number" and ensure value is string or number */}
        <Input
          type={"number"}
          value={formattedValue(value)} // Pass the formatted number or empty string
          onChange={handleInputChange} // Use the refined handler
          className="rounded-r-none" // Remove right rounding to join with 'px' unit
        />
        {/* Display the unit */}
        <span className="p-1 px-3 bg-gray-200 border border-l-0 border-input rounded-r-md text-sm text-muted-foreground">
          px
        </span>
      </div>
    </div>
  );
}



