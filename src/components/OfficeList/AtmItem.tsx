import { Stack, Typography } from '@mui/material';

const AtmItem = (props: any) => {
  const { address } = props.data;

  return (
    <Stack
      sx={{
        borderBottom: '1px solid #0D2C75',
        mt: '10px',
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        sx={{
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '17px',
            fontWeight: '700px',
            ml: '12px',
          }}
        >
          {address}
        </Typography>
      </Stack>
      <Stack direction={'row'} py={'10px'}>
        {/* Загрузка */}
      </Stack>
    </Stack>
  );
};

export default AtmItem;
