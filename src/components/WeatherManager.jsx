import React, { useEffect, useState } from 'react'
import BentoHolder from './BentoHolder'
import Search from './Search'
import { isLoadingWeather } from '../atoms'
import { useAtom } from 'jotai'

const WeatherManager = () => {
    // our global atom from jotai state to check if we are loading or not. loading effect is done in search and weather card
    const [isLoadingW, setIsLoadingW] = useAtom(isLoadingWeather); // working great! flip the bool in our atoms.ts to see effect!

    // our weather data, empty object that gets set from our fetch request
    const [infoObject, setInfoObject] = useState({});

    // the city we will be searching, set from our search component
    const [cityToSearch, setCityToSearch] = useState('');

    // to prevent multiple fetches
    const [isFetching, setIsFetching] = useState(false);

    // our api url and key INSERT YOUR KEY HERE 
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    const apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityToSearch}?key=${apiKey}`;

    // our basic fetch weather function
    const fetchWeatherData = async () => {
        // prevent multiple fetches
        if (isFetching || cityToSearch.length < 1) {
            setIsLoadingW(false); // set our loading weather global to true
            // console.warn('Request In Progress');
            return;
        }
        // flip isfetching and is loading to true
        setIsLoadingW(true);
        setIsFetching(true);

        // set up our try catch
        try {
            // fetch from our api
            const response = await fetch(apiURL)
            
            // if our response isn't ok, or redirected, throw an error
            if (!response.ok || response.redirected) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }

            // get our full response.json
            const data = await response.json();

            // console.log(data);
            
            // set our info we want to pass
            setInfoObject({
                precipitation: data.currentConditions.precipprob,
                windspeed: data.currentConditions.windspeed,
                conditions: data.currentConditions.conditions,
                temperature: data.currentConditions.temp,
                summary: data.description,
                uvindex: data.currentConditions.uvindex,
                city: data.address,
            })

        } catch (error) {
            // catch the error if error
            console.error('Error information: ', error)
        } finally {
            // no longer fetching
            setIsFetching(false);
            // set our gloal is loading variable to false
            setIsLoadingW(false); // set our loading weather global to false
        }
    }

    // fetch on mount and whenever api changes
    useEffect(() => {
        fetchWeatherData();
    }, [apiURL]);
    
    function getSearchCity(city) {
        const lowerCase = city;
        // console.log(lowerCase);
        setCityToSearch(lowerCase);
    }

    return (
        <div className='flex gap-5 flex-col mt-10'>
            <Search getCityToSearch={getSearchCity} refreshSearch={fetchWeatherData}/>
            <BentoHolder temp={infoObject.temperature} windspd={infoObject.windspeed} precip={infoObject.precipitation} sky={infoObject.conditions} descrip={infoObject.summary} uvindex={infoObject.uvindex} city={infoObject.city}/>  
        </div>
    )
}

export default WeatherManager