import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ExploreIcon from "@mui/icons-material/Explore";
import { Stack } from "@mui/material";

import {
  setDrawerOpen,
} from "../../redux/UserLocationSlice/UserLocationSlice";
import { useAppDispatch } from "../../redux/hooks";
import {DRAWER_TYPES} from '../../types';

const NavBar = ({ setMapCenter }: any) => {
  const dispatch = useAppDispatch();

  const handleFilterOpen = () => {
    dispatch(setDrawerOpen(DRAWER_TYPES.FILTER))
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
      sx={{ top: "auto", bottom: 0, backgroundColor: "#FFF" }}
    >
      <Toolbar>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          width={"100%"}
        >
          <IconButton onClick={handleFilterOpen}>
            <TuneIcon
              sx={{
                color: "#000",
              }}
            />
          </IconButton>
          <IconButton
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
          <IconButton onClick={handleLocationClick}>
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
