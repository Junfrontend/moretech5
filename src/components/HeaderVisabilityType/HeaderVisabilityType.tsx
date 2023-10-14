import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getDataDisplayType } from "../../redux/UserLocationSlice/selectors";
import { setDataDisplayType } from "../../redux/UserLocationSlice/UserLocationSlice";
import { DATA_DISPLAY_TYPE } from "../../types";

const HeaderVisabilityType = () => {
  const displayType = useAppSelector(getDataDisplayType);
  const dispatch = useAppDispatch();

  const buttonStyle = {
    textTransform: "capitalize",
    width: "100%",
    border: "none",
    fontSize: "16px",
    borderRadius: "13px",
    fontWeight: "500",
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        p: "15px 10px",
      }}
    >
      <ToggleButtonGroup
        value={displayType}
        exclusive
        onChange={(_, newValue) => dispatch(setDataDisplayType(newValue))}
        aria-label="text alignment"
        sx={{
          width: "99%",
          borderRadius: "16px",
          border: "2px solid #1350AE",
          outline: "4px solid #FFF",
        }}
      >
        <ToggleButton
          sx={{
            ...buttonStyle,

            backgroundColor:
              displayType === DATA_DISPLAY_TYPE.LIST ? "#1350AE !important" : "#FFF",
            color: displayType === DATA_DISPLAY_TYPE.LIST ? "#FFF !important" :"#1350AE",
          }}
          value={DATA_DISPLAY_TYPE.LIST}
          aria-label="left aligned"
        >
          <span>Список</span>
        </ToggleButton>
        <ToggleButton
          sx={{
            ...buttonStyle,
            backgroundColor:
              displayType === DATA_DISPLAY_TYPE.MAP ? "#1350AE !important" : "#FFF",
            color: displayType === DATA_DISPLAY_TYPE.MAP ? "#FFF !important" :"#1350AE",
          }}
          value={DATA_DISPLAY_TYPE.MAP}
          aria-label="centered"
        >
          <span>Карта</span>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default HeaderVisabilityType;
