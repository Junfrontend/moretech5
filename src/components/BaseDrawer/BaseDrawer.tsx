import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAppSelector } from "../../redux/hooks";
import {
  getCurrentDrawerType,
  getIsDrawerOpen,
} from "../../redux/UserLocationSlice/selectors";
import {
  setDrawerClose,
} from "../../redux/UserLocationSlice/UserLocationSlice";
import { useDispatch } from "react-redux";
import { DRAWER_TYPES } from "../../types";
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import DetailsDrawer from '../DetailsDrawer/DetailsDrawer';

export default function BaseDrawer({ children }: any) {
  //   Стейт берем из глобального стора +
  // закрываем тоже через глобальный стор +
  // По флагу динамически всталяем компонент нужны
  const isDrawerOpen = useAppSelector(getIsDrawerOpen);
  const drawerType = useAppSelector(getCurrentDrawerType);
  const dispatch = useDispatch();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      dispatch(setDrawerClose());
    };

  const content = () => {
    switch (drawerType) {
      case DRAWER_TYPES.FILTER:
        // Компонент для начинки Drawer`а
        return <FilterDrawer />;
      case DRAWER_TYPES.OFFICE:
        // Компонент для начинки Drawer`а
        return <DetailsDrawer />;
    }
  };

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {content()}
    </SwipeableDrawer>
  );
}
