import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import ExploreIcon from "@mui/icons-material/Explore";
import { Stack } from "@mui/material";
import { IconsSearch } from "../Icons/IconsSearch";
import {
  setUserLocation,
  setUserLocationWatchId,
} from "../../redux/UserLocationSlice/UserLocationSlice";
import { useAppDispatch } from "../../redux/hooks";
import './navbar.css';

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
          height={"80px"}
        >
          <IconButton>
            <TuneIcon
              sx={{
                color: "#000",
              }}
            />
          </IconButton>
          <button type="button" aria-label='search' className="search-btn"
          >
            <IconsSearch />
          </button>
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
