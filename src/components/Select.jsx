import React, { forwardRef, useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className={`${className}`}></label>}
      <select {...props} ref={ref} id={id}>
        {options ?.map((option)=>(
            <option key={option} value={option}>{option}</option>
        ))}


      </select>
    </div>
  );
};

export default forwardRef(Select);
