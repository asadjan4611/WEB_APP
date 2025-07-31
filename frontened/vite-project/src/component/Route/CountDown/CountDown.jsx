import React, { useState } from 'react'
import { useEffect } from 'react';

const CountDown = () => {
    const [timeLeft,setTimeLeft] = useState(calculateTimeLeft());

    useEffect(()=>{
    const timer = setTimeout(()=>{
        setTimeLeft(calculateTimeLeft);
    },1000);
    });
    function calculateTimeLeft() {
        const difference = new Date("2023-03-15")- +new Date();
        let timeLeft = {};

        if (difference>0) {
            days:Math.floor(difference / (1000*60*60*24));
            hours:Math.floor((difference / (1000*60*60))%24);
            minutes:Math.floor((difference / 1000/60)%60);
            second:Math.floor((difference / 1000)%60);



        }
        return timeLeft;
    }

    const timeComponents = Object.keys(timeLeft).map((interval)=>{
        if (timeLeft[interval]) {
            return null;
        }
        return(
         <span className='text-[25px] text-[#475ad2]'>
            {timeLeft[interval]}{interval}{""}
        </span>

        )
        
    });
  return (
    <div>
      {timeComponents.length ? timeComponents :<span className='text-red-600 text-[15px]'> Time's out  </span>}
    </div>
  )
}

export default CountDown
