import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import BuildingOfficeIcon from "@heroicons/react/24/solid/BuildingOfficeIcon";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";
import { SvgIcon } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import React from "react";

export const items = [
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Users",
    path: "/users",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Templates management",
    path: "/templates-management",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOfficeIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Word management",
    path: "/word-management",
    icon: (
      <SvgIcon fontSize="small">
        <DirectionsCarIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "technical support",
    path: "/technical-support",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Communication page",
    path: "/communication-page",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Platform content",
    path: "/platform-content",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
];
