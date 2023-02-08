import React from 'react';
import { getDateXDaysAgo } from './date';

const WaterCalendar = ({ waterYearlyRecords }) => {
  const dayOfLastYear = (new Date(getDateXDaysAgo(365))).getDay();
  const dayOffset = dayOfLastYear + 1;
  const daysInWeek = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

  return !!waterYearlyRecords && 
    <div className='waterCalendar'>
      <div className='daysLabel'>
        {daysInWeek.map((day, i) => <ul key={i} className='dayInWeek'>{day}</ul>)}
      </div>
      <div className='waterPastYear'>
        {waterYearlyRecords.map((record, i) => {
          const recordStyle = {
            ...(i===0 && { gridRow: dayOffset }),
            ...(!record.water && { backgroundColor: '#e1e1e1eb' }),
            ...(record.water && { backgroundColor: `rgb(40, 167, 69, ${0.3 + 0.6*record.water/record.goal}` })
          }
          return <div 
            className='waterRecordByDay'
            key={record.date}
            style={recordStyle}
          >
            <div className='waterRecordDetail'>
              <span>{`date: ${record.date}`} <br />
                {`drink water: ${record.water ?? 'n.a'}`} <br />
                {`goal: ${record.goal ?? 'n.a'}`}</span>
            </div>
          </div>
        })}
      </div> 
    </div> 
}

export default WaterCalendar;