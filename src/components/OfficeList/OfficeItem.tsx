import {Box, Chip, Stack, Typography} from "@mui/material";
import LocationMark from "../LocationMark/LocationMark";
import {getRandomInt} from '../../utils';

import {
  busyClassNames,
  busyLabels,
} from '../../consts';
import './OfficeItem.css';

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

// todo должен ли быть переход на детальную страницу?
const OfficeItem = (props: any) => {
  const { salePointName, distance, address, metroStation, workload } =
    props.data;

    console.log(workload, 'workload');


  for (const service of Object.values(workload)) {
    console.log(calculateWorkloadPercentage(service));
  }

  const getBusyBranchInfo = () => {
    const busyLevel = getRandomInt(3);
    return {
      label: busyLabels[busyLevel],
      className: busyClassNames[busyLevel],
    };
  };

  const busyBranchInfo = getBusyBranchInfo();

  return (
    <Stack
      sx={{
        borderBottom: "1px solid #0D2C75",
        mt: "10px",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          width: "100%",
        }}
      >
        <LocationMark distance={distance} />
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: "700px",
            ml: "12px",
          }}
        >
          {address}
        </Typography>
      </Stack>
      <Typography fontSize={"12px"}>{salePointName}</Typography>
      <Stack direction={"row"} py={"10px"}>
        {/* Загрузка */}
      </Stack>
      <Stack direction={"row"} py={"10px"} alignItems={'center'} className={'branch-busy-info'}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700px",
            ml: "12px",
            mr: "12px",
          }}
        >
         Загруженность:
        </Typography>
        <Chip label={busyBranchInfo.label} className={`busy-level-${busyBranchInfo.className}`} />
      </Stack>
    </Stack>
  );
};

export default OfficeItem;
