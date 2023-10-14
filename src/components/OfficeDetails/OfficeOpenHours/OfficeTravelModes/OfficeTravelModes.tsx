import React from 'react';
import IconYaCar from '../../../Icons/IconYaCar';
import { IconYaAll } from '../../../Icons/IconYaAll';
import IconYaBus from '../../../Icons/IconYaBus';
import IconYaWalk from '../../../Icons/IconYaWalk';
import IconYaMoto from '../../../Icons/IconYaMoto';
import { IconYaScooter } from '../../../Icons/IconYaScooter';
import { IconYaTaxi } from '../../../Icons/IconYaTaxi';
import './office-travel-modes.css';

export const OfficeTravelModes = () => {
  return (
    <>
      <form>
        <div className='office-travel-modes'>
          <div className='mode-toggle'>
            <label>
              <input type='radio' name='mode'></input>
              <span className='mode-toggle-icon'>
                <IconYaAll />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input type='radio' name='mode'></input>
              <span className='mode-toggle-icon'>
                <IconYaBus />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input type='radio' name='mode'></input>
              <span className='mode-toggle-icon'>
                <IconYaCar />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input type='radio' name='mode'></input>
              <span className='mode-toggle-icon'>
                <IconYaWalk />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input type='radio' name='mode'></input>
              <span className='mode-toggle-icon'>
                <IconYaMoto />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input type='radio' name='mode'></input>
              <span className='mode-toggle-icon'>
                <IconYaScooter />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input type='radio' name='mode'></input>
              <span className='mode-toggle-icon'>
                <IconYaTaxi />
              </span>
            </label>
          </div>
        </div>
      </form>
    </>
  );
};
