import React from 'react';
import { OfficeType } from '../../types/office';
import './office-details.css';
import { officesData } from '../../mocks/offices';
import { IconBookmark } from '../Icons/IconBookmark';
import { IconEmail } from '../Icons/IconEmail';
import { IconPhone } from '../Icons/IconPhone';

export const OfficeDetails = () => {
  const { salePointName, address } = officesData[0];

  return (
    <div className='office-details'>
      <header className='office-details-header'>
        <h2 className='office-title'>{salePointName}</h2>
        <nav className='office-nav'>
          <ul className='office-link-list'>
            <li>
              <button aria-label='Добавить в закладки' className='office-link'>
                <IconBookmark />
              </button>
            </li>
            <li>
              <a
                href='tel:+79001111111'
                title='Позвонить в оффис'
                aria-label='Позвонить в оффис'
                className='office-link'
              ><IconPhone /></a>
            </li>
            <li>
              <a
                href={`mailto:blog@htmlacademy.ru&cc=mail@htmlacademy.ru?body=Привет, подпишитесь на рассылку`}
                title='Позвонить в оффис'
                aria-label='Позвонить в оффис'
                className='office-link'
              ><IconEmail /></a>
            </li>
          </ul>
        </nav>
      </header>
      
      <p className='office-adress'>{address}</p>
    </div>
  );
};
