import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ExploreIcon from "@mui/icons-material/Explore";
import { Stack } from "@mui/material";

import {
  setDataDisplayType,
  setDrawerOpen,
  setUserLocation,
  setUserLocationWatchId,
} from "../../redux/UserLocationSlice/UserLocationSlice";
import { useAppDispatch } from "../../redux/hooks";
import { DATA_DISPLAY_TYPE, DRAWER_TYPES } from "../../types";

const NavBar = () => {
  const dispatch = useAppDispatch();

  const handleUserGeoReceive = (position: any) => {
    dispatch(
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const handleSearchIconClick = () => {
    dispatch(
      setDrawerOpen(DRAWER_TYPES.SEARCH)
    )
  }

  const handleUserGeoRequest = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(handleUserGeoReceive);

      const userLocationWatchId =
        navigator.geolocation.watchPosition(handleUserGeoReceive);
      dispatch(setUserLocationWatchId(userLocationWatchId));
    } else {
      alert("Гео недоступно");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "#FFF" }}
    >
      <Toolbar>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          width={"100%"}
        >
          <IconButton>
            <TuneIcon
              sx={{
                color: "#000",
              }}
            />
          </IconButton>
          <IconButton
          onClick={handleSearchIconClick}
            sx={{
              backgroundColor: "#165BC6",
              borderRadius: "12px",
              position: "relative",
              bottom: "20px",
              margin: "0 auto",
            }}
          >
            <SearchIcon
              sx={{
                color: "#FFF",
              }}
            />
          </IconButton>
          <IconButton onClick={handleUserGeoRequest}>
            <ExploreIcon
              sx={{
                color: "#000",
              }}
            />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
