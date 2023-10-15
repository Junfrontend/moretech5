import {
  getOfficeList,
  getPointType,
} from '../../redux/UserLocationSlice/selectors';
import { useAppSelector } from '../../redux/hooks';
import { PointEnum } from '../../types/office';
import AtmItem from './AtmItem';
import OfficeItem from './OfficeItem';
import { Stack } from '@mui/material';
import { officesData } from '../../mocks/offices';

const OfficeList = () => {
  const pointType = useAppSelector(getPointType);
  const officeList = useAppSelector(getOfficeList);

  return (
    <Stack
      sx={{
        px: '20px',
      }}
    >
      {pointType === PointEnum.OFFICE &&
        officeList &&
        officeList?.map((el: any, index) => (
          <OfficeItem data={el} key={index} />
        ))}
      {pointType === PointEnum.ATM &&
        officeList &&
        officeList?.map((el: any, index) => <AtmItem data={el} key={index} />)}
    </Stack>
  );
};

export default OfficeList;
