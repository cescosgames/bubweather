import React from 'react'
import { WeatherCard } from './WeatherCard'

const BentoHolder = ({ temp, windspd, precip, sky, descrip, uvindex, city }) => {
    // dynamically loading our weather cards in our holder. to add more, just add another category and load it properly from the weathermanager component
    const weatherData = [
        { id: 7, weatherCategory: "City", weatherValue: city},
        { id: 2, weatherCategory: "Summary", weatherValue: descrip},
        { id: 1, weatherCategory: "Temperature", weatherValue: temp},
        { id: 3, weatherCategory: "Sky", weatherValue: sky},
        { id: 4, weatherCategory: "Precip. %", weatherValue: precip},
        { id: 5, weatherCategory: "Wind Speed", weatherValue: windspd},
        { id: 6, weatherCategory: "UV Index", weatherValue: uvindex},
    ]
    
  return (
    // this used to be a bento grid, but for the purpose of simplifying dynamic loading I made it a straightforward grid
        <div className='flex justify-center md:min-h-[33vh] min-h-[66vh]'>
            <div className="flex w-sm aspect-square justify-center">
                <div className="grid md:w-full w-xs gap-4 md:grid-cols-3 md:grid-rows-3 grid-cols-2 grid-rows-4">
                    {/* map over our weather data to instantiate a weather card for each category */}
                    {weatherData.map((data) => {
                        return(
                            <WeatherCard 
                                key={data.id}
                                weatherCategory={data.weatherCategory}
                                weatherValue={data.weatherValue}
                            />
                        )
                    })}


                    {/* this is the original bento set up test, using manual col/row-spans for desired outcome */}
                    {/* <div className="md:col-span-3 md:row-span-1 flex items-center justify-center" >
                        <WeatherCard weatherCategory={'Precipitation'} weatherValue={precip}/>
                    </div>

                    <div className="md:col-span-1 md:row-span-3 flex items-center justify-center">
                        <WeatherCard weatherCategory={'Wind Speed'} weatherValue={windspd}/>
                    </div>

                    <div className="md:col-span-1 md:row-span-3 flex items-center justify-center">
                        <WeatherCard weatherCategory={'Sky'} weatherValue={sky}/>  
                    </div>

                    <div className="md:col-span-2 md:row-span-2 flex items-center justify-center">
                        <WeatherCard weatherCategory={'Temperature'} weatherValue={temp}/>
                    </div>

                    <div className="md:col-span-3 md:row-span-1 flex items-center justify-center">
                        <WeatherCard weatherCategory={'Summary'} weatherValue={descrip}/>
                    </div> */}
                </div>
            </div>
        </div>
  )
}

export default BentoHolder