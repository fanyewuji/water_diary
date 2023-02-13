import React, { useContext } from 'react';
import WaterContext from '../../context/water/waterContext';
import WaterCalendar from './WaterCalendar';
import { getDateXDaysAgo } from './date';

const WaterHistory = () => {
  const waterContext = useContext(WaterContext);

  const { getWaterHistory, waterHistory, loadingWaterHistory, showWaterHistory, hideWaterHistory } = waterContext;

  const waterHistoryByDate = waterHistory?.reduce((waterByDate, record) => {
    const {date, water, goal} = record;
    return {...waterByDate, [date]: { date, water, goal}}
  }, {});

  const waterPastYear = waterHistoryByDate && [...Array(365)].map((_, i) => {
    const pastDate = getDateXDaysAgo(365-i);
    return waterHistoryByDate[pastDate] ? { ...waterHistoryByDate[pastDate] } : { date: pastDate }
  });

  console.log('waterPastYear: ', waterPastYear);

  const handleClickGetHistory = () => {
    getWaterHistory();
  }

  const handleClickHide = () => {
    hideWaterHistory();
  }
  console.log('loadingHistory: ', loadingWaterHistory);
  console.log('show: ', showWaterHistory);

  return (
    <div className='waterHistory'>
      { !showWaterHistory 
        ? <button className='viewHistoryBtn' onClick={handleClickGetHistory}>View Water History</button>
        : <button className='hideHistoryBtn' onClick={handleClickHide}>Hide Water Records</button>
      }
      <div>
        { loadingWaterHistory 
          ? <span>loading water history</span>
          : showWaterHistory && <WaterCalendar waterYearlyRecords={waterPastYear} />
        }
      </div>
    </div>
  )
}

export default WaterHistory;