"use client";
import { Skeleton, Box } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box sx={{ width: "100vw" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}

export default Loading;
