import React from 'react';
import { OpenHoursType } from '../../../types/office';

export const OfficeOpenHours = ({
  openHours,
}: {
  openHours: any;
}) => {
  return (
    <div>
      {openHours.map((el: any) => (
        <span>{el.days}</span>
      ))}
    </div>
  );
};
