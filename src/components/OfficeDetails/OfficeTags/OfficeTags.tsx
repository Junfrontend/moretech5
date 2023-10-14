import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const tags = ['Все услуги', 'Карты', 'Кредиты', 'Ипотека', 'Сейф'];

const OfficeTags = ({handleClick}: {handleClick: () => void}) => {
  return (
    <Stack direction='row' spacing={1} mb={2}>
      {tags.map((el) => (
        <Chip label={el} size='small' variant='outlined' onClick={handleClick} key={el}/>
      ))}
    </Stack>
  );
};

export default OfficeTags;
