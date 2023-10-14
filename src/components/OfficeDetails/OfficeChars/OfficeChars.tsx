import React from 'react';
import './OfficeChar.css';

type CharsType = {
  day: number;
  count: number;
};

const getUniqueFromRange = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const colors = ["#7B8584", "#1350AE", "#B5FC59", "#D9D9D9"];

const getRandomItem = (items: string[]) => {
  return items[getUniqueFromRange(0, items.length)];
};

const Char = ({ char }: { char: CharsType }) => {
  const { day, count } = char;

  return (
    <>
      <div className='char'>
        <div
          className='char-cont'
          style={{
            background: getRandomItem(colors),
            height: getUniqueFromRange(100, 200),
          }}
        ></div>
      </div>
    </>
  );
};

export const OfficeChars = ({ chars }: { chars: CharsType[] }) => {
  return (
    <div className='office-chars'>
      {chars.map((el) => (
        <Char char={el} />
      ))}
    </div>
  );
};
