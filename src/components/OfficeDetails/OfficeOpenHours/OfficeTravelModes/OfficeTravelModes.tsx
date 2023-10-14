import React from 'react';
import IconYaCar from '../../../Icons/IconYaCar';
import { IconYaAll } from '../../../Icons/IconYaAll';
import IconYaBus from '../../../Icons/IconYaBus';
import IconYaWalk from '../../../Icons/IconYaWalk';
import IconYaMoto from '../../../Icons/IconYaMoto';
import { IconYaScooter } from '../../../Icons/IconYaScooter';
import { IconYaTaxi } from '../../../Icons/IconYaTaxi';

export const OfficeTravelModes = () => {
  return (
    <>
      <form>
        <label>
          <IconYaAll />
          <input type='radio' name='mode'></input>
        </label>
        <label>
          <IconYaBus />
          <input type='radio' name='mode'></input>
        </label>
        <label>
          <IconYaCar />
          <input type='radio' name='mode'></input>
        </label>
        <label>
          <IconYaWalk />
          <input type='radio' name='mode'></input>
        </label>
        <label>
          <IconYaMoto />
          <input type='radio' name='mode'></input>
        </label>
        <label>
          <IconYaScooter />
          <input type='radio' name='mode'></input>
        </label>
        <label>
          <IconYaTaxi />
          <input type='radio' name='mode'></input>
        </label>
      </form>
    </>
  );
};
