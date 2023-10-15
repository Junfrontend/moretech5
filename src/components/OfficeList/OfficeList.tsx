import {
  getOfficeList,
  getPointType,
} from '../../redux/UserLocationSlice/selectors';
import { useAppSelector } from '../../redux/hooks';
import { PointEnum } from '../../types/office';
import AtmItem from './AtmItem';
import OfficeItem from './OfficeItem';
import { Stack } from '@mui/material';

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
        officeList?.map((el: any) => <OfficeItem data={el} />)}
      {pointType === PointEnum.ATM &&
        officeList &&
        officeList?.map((el: any) => <AtmItem data={el} />)}
    </Stack>
  );
};

export default OfficeList;
