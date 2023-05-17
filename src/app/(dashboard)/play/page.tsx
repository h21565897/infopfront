"use client";
import { Divider, Drawer, Toolbar } from "@mui/material";
import React from "react";

function IndexPage() {
  const drawer = (
    <div>
      <Toolbar></Toolbar>
      <Divider></Divider>
    </div>
  );
  return (
    <div>
      <Drawer variant="permanent" open>
        {drawer}
      </Drawer>
    </div>
  );
}

export default IndexPage;
