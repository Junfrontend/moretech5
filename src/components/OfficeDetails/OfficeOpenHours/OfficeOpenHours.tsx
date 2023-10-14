import React from 'react';
import { OpenHoursType } from '../../../types/office';
import './office-open-hours.css';

export const OfficeOpenHours = ({ openHours }: { openHours: any }) => {
  return (
    <div className='office-open-hours'>
      {openHours.map((el: any) => (
        <p className='office-open-info'>
          <span className='office-open-day'>{el.days}</span>
          <span>{el.hours}</span>
        </p>
      ))}
    </div>
  );
};
