import { getOfficeList } from "../../redux/UserLocationSlice/selectors";
import { useAppSelector } from "../../redux/hooks";
import OfficeItem from "./OfficeItem";
import { Stack } from "@mui/material";
import {officesData} from '../../mocks/offices';


const OfficeList = () => {
  const officeList = useAppSelector(getOfficeList);

  return (
    <Stack sx={{
        px: '20px',
    }}>
      {officeList.map((el: any, index: number) => <OfficeItem data={el}  key={index}/>)}
    </Stack>
  );
};

export default OfficeList;
