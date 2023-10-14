import React from 'react';
import './OfficeChar.css';

type CharsType = {
  day: number;
  count: number;
};

const getUniqueFromRange = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const colors = ['#7B8584', '#1350AE', '#B5FC59'];

const getRandomItem = (items: string[]) => {
  return items[getUniqueFromRange(0, items.length - 1)];
};

const Char = ({ char }: { char: CharsType }) => {
  const h = `${getUniqueFromRange(0, 100)}%`;

  return (
    <>
      <div className='char'>
        <span className='char-count'>{h}</span>
        <div
          className='char-cont'
          style={{
            background: getRandomItem(colors),
            height: h,
          }}
        />
      </div>
    </>
  );
};

export const OfficeChars = ({ chars }: { chars: CharsType[] }) => {
  return (
    <div className='office-chars'>
      {chars.map((el) => (
        <Char char={el} key={el.day}/>
      ))}
    </div>
  );
};
