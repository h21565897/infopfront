import { Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
const globalAttri = {
  marginLeftAndRight: "0.5rem",
};
const SideBarListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  top: 0;
  height: 100vh;
  left: 0;
  width: 12rem;
  background-color: #151b26;
  white-space: nowrap;
  transition: all 0.25s ease;
  position: absolute;
  top: 6rem;
`;
const ListItemWrapper = styled.li`
  height: 3rem;
  margin: 0.5rem ${globalAttri.marginLeftAndRight};
  display: flex;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const LabelWrapper = styled.div`
  height: 1rem;
  color: #868787;
  font-size: 0.5rem;
  margin: 0.5rem ${globalAttri.marginLeftAndRight};
`;
function SideBar() {
  return (
    <div>
      <SideBarListWrapper>
        <LabelWrapper>Tempalte Management</LabelWrapper>
        <ListItemWrapper>
          <StyledLink href="/accountManage">account manage</StyledLink>
        </ListItemWrapper>
        <ListItemWrapper>
          <StyledLink href="/templateManage">template manage</StyledLink>
        </ListItemWrapper>
      </SideBarListWrapper>
    </div>
  );
}

export default SideBar;
