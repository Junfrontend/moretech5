import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import ExploreIcon from "@mui/icons-material/Explore";
import { Stack } from "@mui/material";
import { IconsSearch } from "../Icons/IconsSearch";
import {
  setDataDisplayType,
  setDrawerOpen,
  setUserLocation,
  setUserLocationWatchId,
} from "../../redux/UserLocationSlice/UserLocationSlice";
import { useAppDispatch } from "../../redux/hooks";
import { DATA_DISPLAY_TYPE, DRAWER_TYPES } from "../../types";

const NavBar = ({ setMapCenter }: any) => {
  const dispatch = useAppDispatch();

  const handleFilterOpen = () => {
    dispatch(setDrawerOpen(DRAWER_TYPES.FILTER))
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

  const handleLocationClick = () => {
    const map = document.querySelector('#map');
    if (map) {
      setMapCenter();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "var(--color-background)" }}
    >
      <Toolbar>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          width={"100%"}
          height={"80px"}
        >
          <IconButton onClick={handleFilterOpen}>
            <TuneIcon
              sx={{
                color: "var(--color-text)",
              }}
            />
          </IconButton>
          <button onClick={handleSearchIconClick} type="button" aria-label='search' className="search-btn"
          >
            <IconsSearch />
          </button>
          <IconButton onClick={handleLocationClick}>
            <ExploreIcon
              sx={{
                color: "var(--color-text)",
              }}
            />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
