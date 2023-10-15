import { Box, Stack, Typography } from '@mui/material';
import LocationMark from '../LocationMark/LocationMark';

function calculateWorkloadPercentage(workload: any) {
  console.log(workload, 'workload 222');

  // Находим общее количество count за все дни
  const total = 30;

  // Рассчитываем процент загруженности для каждого дня
  const result = workload.map((day: any) => {
    const percentage = Math.ceil((day.count / total) * 100);
    return { day: day.day, percentage };
  });

  return result;
}

const OfficeItem = (props: any) => {
  const { salePointName, distance, address, metroStation, workload } =
    props.data;

  console.log(workload, 'workload');

  for (const service of Object.values(workload)) {
    console.log(calculateWorkloadPercentage(service));
  }

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
        {<LocationMark distance={distance} />}
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
      <Typography fontSize={'12px'}>{salePointName}</Typography>
      <Stack direction={'row'} py={'10px'}>
        {/* Загрузка */}
      </Stack>
    </Stack>
  );
};

export default OfficeItem;
