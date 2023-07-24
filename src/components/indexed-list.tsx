import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import PropTypes from "prop-types";

export const IndexedList = (props: any) => {
  const { items } = props;
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {items &&
        items.map((item: any, index: number) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{item.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.label} secondary={item.value} />
          </ListItem>
        ))}
    </List>
  );
};

IndexedList.prototype = {
  items: PropTypes.array,
  addresses: PropTypes.array,
};
