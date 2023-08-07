import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import BuildingOfficeIcon from "@heroicons/react/24/solid/BuildingOfficeIcon";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";
import EditNoteIcon from '@mui/icons-material/Handshake';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GavelIcon from "@mui/icons-material/Gavel";
import GroupsIcon from '@mui/icons-material/Groups';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
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
    title: "Package Management",
    path: "/package-management",
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
    title: "Department Management",
    path: "/department-management",
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
    title: "What our clients said about us",
    path: "/content-and-texts/rewies",
    icon: (
      <SvgIcon fontSize="small">
        <ManageAccountsIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "How do you guarantee your rights",
    path: "/content-and-texts/rights-guarantee",
    icon: (
      <SvgIcon fontSize="small">
        <GavelIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "About A3maly",
    path: "/content-and-texts/who-we-are",
    icon: (
      <SvgIcon fontSize="small">
        <GroupsIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Terms and Conditions",
    path: "/content-and-texts/terms-and-conditions",
    icon: (
      <SvgIcon fontSize="small">
        <EditNoteIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Visual identification",
    path: "/content-and-texts/introductory-video",
    icon: (
      <SvgIcon fontSize="small">
        <YouTubeIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "How does A3maly help you",
    path: "/content-and-texts/how-a3maly-helps",
    icon: (
      <SvgIcon fontSize="small">
        <HandshakeIcon />
      </SvgIcon>
    ),
  },
  {
    external: false,
    disabled: false,
    menu: false,
    title: "How to order in A3maly",
    path: "/content-and-texts/how-to-order",
    icon: (
      <SvgIcon fontSize="small">
        <AddBusinessIcon />
      </SvgIcon>
    ),
  },
];
