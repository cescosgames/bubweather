import React, { useEffect, useRef, useState } from 'react'

const SuggestionDropdown = ({ suggestions, onSelect, closeDropDown }) => {
  // adding keyboard navigation using up down arrows and enter key by changing index
  const [dropdownIndex, setDropdownIndex] = useState(-1) // -1 means nothing selected to start
  
  // reference our dropdown to force focus on tab-in
  const suggestionDropdownRef = useRef(null);

  // our keydown functions
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      // Go down the dropdown list
      setDropdownIndex((prevIndex) => Math.min(suggestions.length - 1, prevIndex + 1));
    } else if (event.key === 'ArrowUp') {
      // Go up the dropdown list
      setDropdownIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else if (event.key === 'Enter' && dropdownIndex >= 0) {
      // Select the item from the dropdown
      onSelect(suggestions[dropdownIndex]);
    } else if (event.key === 'Escape') {
      closeDropDown();
    }
  };

  // 'scroll' to highlighted item in case of overflowing list, index as dependency
  useEffect(() => {
    // get our currently highlighted item if keyboard navigating
    const dropdownElement = suggestionDropdownRef.current;
    if (dropdownElement && dropdownIndex >= 0) {
      const selectedItem = dropdownElement.children[dropdownIndex];
      if (selectedItem) {
        // Scroll the dropdown so the selected item is in view using built in .scrollIntoView
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', // Ensure the selected item stays visible
        });
      }
    }
  }, [dropdownIndex]);

  return (
    // our main UL that will hold our all li's, mapped from our suggestions list from the search component
      <ul 
        ref={suggestionDropdownRef} 
        onKeyDown={handleKeyDown} 
        tabIndex={0} 
        className="absolute z-10 bg-prolightblue no-scrollbar text-prowhiteblue rounded-md w-xs top-full mt-1 max-h-40 overflow-y-auto dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600 dark:border-1"
      >
        {suggestions.map((city, index) => (
          <li
            key={index}
            role='option'
            onClick={() => onSelect(city)}
            className={`cursor-pointer p-2 transition hover:bg-prohighlight hover:text-prooffwhite dark:hover:bg-gray-100 dark:hover:text-problue ${index === dropdownIndex ? 'hoverOption' : ''}`}
            tabIndex={-1} // not focusable by default
          >
            {city}
          </li>
        ))}
      </ul>
  )
}

export default SuggestionDropdown