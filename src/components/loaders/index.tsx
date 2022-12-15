import React, { CSSProperties } from "react";
import { CircularProgress } from "@mui/material";

const LoadBox = {
  position: 'fixed',
  width: '100%',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  backgroundColor: 'rgb(0,0,0, 0.7)',
  zIndex: 9999,
  display: 'flex',
} as CSSProperties;

const IconContainer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
} as CSSProperties;

const Loader = (): JSX.Element => {
  return (
    <div style={LoadBox}>
      <div style={IconContainer}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
