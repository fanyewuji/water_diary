import React, { useContext } from 'react';
import WaterContext from '../../context/water/waterContext';
import WaterCalendar from './WaterCalendar';
import { getDateXDaysAgo } from './date';

const WaterHistory = () => {
  const waterContext = useContext(WaterContext);

  const { getWaterHistory, waterHistory, loadingWaterHistory } = waterContext;

  const waterHistoryByDate = waterHistory?.reduce((waterByDate, record) => {
    const {date, water, goal} = record;
    return {...waterByDate, [date]: { date, water, goal}}
  }, {});

  const waterPastYear = waterHistoryByDate && [...Array(365)].map((_, i) => {
    const pastDate = getDateXDaysAgo(365-i);
    return waterHistoryByDate[pastDate] ? { ...waterHistoryByDate[pastDate] } : { date: pastDate }
  });

  console.log('waterPastYear: ', waterPastYear);

  const handleClick = () => {
    getWaterHistory();
  }

  return (
    <>
      <button onClick={handleClick}>WaterHistory</button>
      <div>
        { loadingWaterHistory 
          ? <span>loading water history</span>
          : <WaterCalendar waterYearlyRecords={waterPastYear} />
        }
      </div>
    </>
  )
}

export default WaterHistory;