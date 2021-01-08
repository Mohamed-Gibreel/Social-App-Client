import React from "react";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default function iconButton({ title, children, onClick, btnClassName }) {
  return (
    <ToolTip title={title}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </ToolTip>
  );
}
