import React from 'react';

type CharsType = {
  day: number;
  count: number;
};

const Char = ({ char }: { char: CharsType }) => {
  const { day, count } = char;
  
  return (
    <>
      {/* <div>
        <div style={{`height: ${count}%`}}></div>
      </div> */}
    </>
  );
};

export const OfficeChars = ({ chars }: { chars: CharsType[] }) => {
  return (
    <>
      {chars.map((el) => (
        <Char char={el} />
      ))}
    </>
  );
};
