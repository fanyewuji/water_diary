import React, { useContext } from 'react';
import WaterContext from '../../context/water/waterContext';


const ProgressBar = () => {
    const waterContext = useContext(WaterContext);

    const { waterToday } = waterContext;

    const progress = parseInt(waterToday.water/waterToday.goal*100);
    // to display progress number properly, adjust the min progressComplete height to be 5% 
    const progressAdjusted = progress < 5 ? 5 : progress;

    return (
        <div className='progressBar'>
            <div className='progressComplete' style={{height: `${progressAdjusted}%`, maxHeight: '100%'}}>
                <div className='progressLiquid'></div>
                <span className='progressNumber'>{`${progress}%`}</span>
            </div>
        </div>
    )
}

export default ProgressBar;