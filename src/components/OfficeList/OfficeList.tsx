import { getOfficeList } from "../../redux/UserLocationSlice/selectors";
import { useAppSelector } from "../../redux/hooks";
import OfficeItem from "./OfficeItem";
import { Stack } from "@mui/material";


const OfficeList = () => {
  const officeList = useAppSelector(getOfficeList);
  return (
    <Stack sx={{
        px: '20px',
    }}>
      {officeList.map((el: any) => <OfficeItem data={el} />)}
    </Stack>
  );
};

export default OfficeList;
