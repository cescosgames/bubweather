import React, { useEffect, useState, useRef } from 'react'
// import { useRef } from 'react';
import cities from '../assets/data/cities.json';
import SuggestionDropdown from './SuggestionDropdown';
import { isLoadingWeather } from '../atoms';
import { useAtomValue } from 'jotai';

const Search = ({ getCityToSearch, refreshSearch }) => {
  // check if we are loading weather to enable/disable our search button
  const isLoadingW = useAtomValue(isLoadingWeather) // only need value here, not changing

  // useRef for our input field, set to null initially
  const inputRef = useRef(null);
  // checking if it's a valid search
  const [isValidSearch, setIsValidSearch] = useState(false);
  // our 'flip button' switch
  const [canClick, setCanClick] = useState(false);

  // our state for the user input, empty string default
  const [userCity, setUserCity] = useState("");
  // our suggestions of cities, presented as an array
  const [suggestions, setSuggestions] = useState([])
  // checking if our dropdown is visible or not, false on start unless something is typed in search bar
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // our function to make recommendations, uses array.filter on our json city file to return a new array of the filtered cities
  const handleRecommendation = (event) => {
    const input = event.target.value;
    setUserCity(input);

    // if input returns truthy
    if (input) {
      setIsDropDownOpen(true);
      const filteredSuggestions = cities.filter((city) => city.toLowerCase().startsWith(input.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      // if there is nothing in input, dropdown is not open
      setIsDropDownOpen(false);
      // set suggestions to empty array
      setSuggestions([]);
    }
  };

  // our main search function
  const searchCity = () => {
    // check if we are already searching
    if (isLoadingW === true) {
      // console.log('error, already searching city');
      return;
    }

    setIsDropDownOpen(false);

    checkIfValidSearch();

    getCityToSearch(getFixedSearchString());
  }

  // function to get our search string in lower case with whitespace trimmed and double spaces removed
  const getFixedSearchString = () => {
    const fixedResult = inputRef.current.value.trim().replace(/\s+/g, " ").toLowerCase();
    return fixedResult;
  }

  // to check if our seach is valid and enable/disable our button
  const checkIfValidSearch = () => {
    let fCitySearch = getFixedSearchString();
    // using .some to iterate over the city array in our json file
    const searchExists = cities.some(city => city.toLowerCase() === fCitySearch);

    if (searchExists !== isValidSearch) {
      // console.log('Updating isValidSearch:', searchExists);
      setIsValidSearch(searchExists);
      setCanClick(false);
    } else {
      // console.log('Updating isValidSearch:', searchExists);
      setIsValidSearch(searchExists);
      setCanClick(true);
    }
  }

  // manually close our dropdown
  const closeDropDown = () => {
    setIsDropDownOpen(false);
  }


  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* conditional error message */}
      {!isValidSearch ? <div className='text-prohighlight italic text-xs'>Please Select A Suggested City</div> : ''}

      <div
        className={`relative flex items-center bg-prooffwhite rounded-full shadow-sm px-4 py-2 md:w-sm w-xs dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600 dark:border-1 dark:shadow-problue ${!isValidSearch ? 'error' : ''}`}
      >
        
        <input
          ref={inputRef}
          type="text"
          value={userCity}
          placeholder="Enter a major US city"
          className="flex-grow outline-none bg-transparent dark:text-gray-100 text-sm"
          onChange={(event) => {
            // regex for only allowing uppercase and lowercase letters and single spaces, should prevent apple double space, trimming for white space
            let regexValue = event.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ');
            checkIfValidSearch();
            setUserCity(regexValue);
            handleRecommendation(event);
            setIsValidSearch(true);
          }}
          aria-label='Input City For Weather Information'
        />

        {/* show dropdown if it's open */}
        {isDropDownOpen && suggestions.length > 0 ? 
          <SuggestionDropdown 
            suggestions={suggestions}
            closeDropDown={closeDropDown}
            onSelect={(city) => {
              setUserCity(city);
              setIsDropDownOpen(false);
              setCanClick(true);
          }}/> : null
        }

        {/* disable the search and refresh button if we can't click or are loading, this will prevent 'disallowed' searches */}
        <button 
          disabled={isLoadingW || !canClick}
          className="cursor-pointer text-white bg-prohighlight transition hover:opacity-50 px-4 py-1 rounded-full text-sm"
          onClick={() => {
            searchCity();
          }}
          aria-label='Search City'
        >
          {/* heroicons search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        <button
          disabled={isLoadingW || !canClick}
          className="ml-1 cursor-pointer text-white bg-prohighlight transition hover:opacity-50 px-4 py-1 rounded-full text-sm"
          onClick={() => {
            refreshSearch();
          }}
          aria-label='Refresh City'
        > 
          {/* heroicons refresh icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default Search