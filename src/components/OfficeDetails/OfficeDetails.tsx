import './office-details.css';
import { officesData } from '../../mocks/offices';
import { IconBookmark } from '../Icons/IconBookmark';
import { IconPhone } from '../Icons/IconPhone';
import { OfficeFeatures } from './OfficeFeatures/OfficeFeatures';
import { IconLocation } from '../Icons/IconLocation';
import IconAlarm from '../Icons/IconAlarm';
import { OfficeOpenHours } from './OfficeOpenHours/OfficeOpenHours';
import IconClue from '../Icons/IconClue';
import { OfficeTravelModes } from './OfficeOpenHours/OfficeTravelModes/OfficeTravelModes';
import OfficeTabs from './OfficeTabs/OfficeTabs';
import {useAppSelector} from '../../redux/hooks';
import {getCurrentOffice} from '../../redux/UserLocationSlice/selectors';

export const OfficeDetails = () => {
  const currentOffice = useAppSelector(getCurrentOffice);
  const { salePointName, address, openHours } = currentOffice;

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
              <a aria-label='расстояние до офиса' className='office-distance'>
                <IconLocation />
                <span>200 m</span>
              </a>
            </li>
            <li>
              <a
                href='tel:+79001111111'
                title='Позвонить в оффис'
                aria-label='Позвонить в оффис'
                className='office-link'
              >
                <IconPhone />
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <OfficeFeatures />
      <p className='office-note'>
        <span className='office-small-icon'>
          <IconLocation />
        </span>
        {address}
      </p>
      <div className='office-schedule'>
        <p className='office-note'>
          <span className='office-small-icon'>
            <IconAlarm />
          </span>
        </p>
        Режим работы:
        {openHours.length && <OfficeOpenHours openHours={openHours} />}
      </div>

      <OfficeTabs />

      <footer>
        <OfficeTravelModes />
      </footer>
    </div>
  );
};
