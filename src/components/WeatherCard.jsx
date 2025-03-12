import React from 'react'
import { Spinner } from './Spinner'
import { isLoadingWeather } from '../atoms'
import { useAtomValue } from 'jotai'

export const WeatherCard = ({ weatherCategory, weatherValue }) => {
  // our loading global
  const isLoadingW = useAtomValue(isLoadingWeather);

  return (
    // added tab-index here so screen readers can access the weather information
    <div tabIndex={0} className='bg-prooffwhite text-prodarkblue rounded-full shadow-sm w-[100%] h-[100%] transition-all hover:scale-105 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600 dark:border-1 dark:shadow-problue'>
        <div className="py-6 transition w-[100%] h-[100%] flex flex-col justify-center items-center">
          
          {/* our weather card is simple, if it's loading show the spinner, otherwise show the information */}
          {isLoadingW ? <Spinner /> : <>
              <h5 className="mb-2 md:text-sm font-bold tracking-tight">{weatherCategory}</h5>

              {weatherValue ? <p className="px-3 font-normal text-gray-500 overflow-auto text-sm no-scrollbar gradient-fade">{weatherValue}</p> : <p className='opacity-50 text-sm'>N/A</p>}
            </>
          }
            
        </div>
    </div>
  )
}