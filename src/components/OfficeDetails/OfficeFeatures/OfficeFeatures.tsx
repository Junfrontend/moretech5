import React from 'react';
import './office-features.css';
import IconBabyCarriage from '../../Icons/IconBabyCarriage';
import { IconDatabases } from '../../Icons/IconDatabases';
import { IconParking } from '../../Icons/IconParking';
import { IconKey } from '../../Icons/IconKey';
import { IconWifi } from '../../Icons/IconWifi';

export const OfficeFeatures = () => {
  return (
    <ul className='office-features-list'>
      <li className='office-features-item'><span aria-label='Доступно для посетителей с детьми' className='office-feature'><IconBabyCarriage /></span></li>
      <li className='office-features-item'><span aria-label='Доступно обмен валют' className='office-feature'><IconDatabases /></span></li>
      <li className='office-features-item'><span aria-label='Есть парковка' className='office-feature'><IconParking /></span></li>
      <li className='office-features-item'><span aria-label='Есть сейф' className='office-feature'><IconKey /></span></li>
      <li className='office-features-item'><span aria-label='Есть wifi' className='office-feature'><IconWifi /></span></li>
    </ul>
  );
};
