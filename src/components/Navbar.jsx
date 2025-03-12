import React from 'react'

const Navbar = () => {

  const toggleDarkMode = () => {
    // referring to our root html where we have class='dark' enabled to manually switch between dark and light modes
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
  };

  return (
    // the outside
    <div className='w-full flex justify-center items-center text-sm font-medium font-sans hover:scale-100 transition dark:text-gray-100'>
        {/* the interior */}
        <div className='flex justify-between rounded-full px-5 py-2 md:w-xl w-sm shadow-[0px_12px_12px_-5px_rgba(0,_0,_0,_0.1)] items-center dark:bg-gray-900 dark:border-gray-600 dark:border-1 dark:shadow-[0px_12px_12px_-5px_rgba(100,_100,_100,_0.2)]'>
            {/* right side */}
            <div className='flex justify-center items-center gap-2'>
              <div className='flex justify-center items-center gap-1'>
                <span className='h-3 w-1 rounded-full bg-prodarkblue'></span>
                <span className='h-3 w-1 rounded-full bg-problue'></span>
                <span className='h-3 w-1 rounded-full bg-prohighlight'></span>
              </div>
              <span className='hover:cursor-pointer hover:opacity-50 transition'>BubWeather</span>
            </div>
            {/* left side */}
            <div className='flex gap-5 items-center justify-center'>
              {/* dark mode toggle */}
                <button
                  aria-label='Dark Mode Toggle'
                  onClick={() => toggleDarkMode()}
                  className='hover:cursor-pointer hover:opacity-50 transition text-lg'>
                  {/* moon symbol for night mode switch from heroicons */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                </button>
                {/* link to the github repo */}
                <a href="#" className='hover:cursor-pointer hover:opacity-50 transition' target='_blank' aria-label='Link For BubWeather Github Repo'>GitHub</a>
            </div>
        </div>
    </div>
  )
}

export default Navbar