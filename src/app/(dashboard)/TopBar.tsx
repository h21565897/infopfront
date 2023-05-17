"use client";
import { signIn, useSession, getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./topbar.module.css";
import styled from "styled-components";
function TopBar() {
  const TopBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background-color: #151b26;
    color: white;
    height: 4.5rem;
    position: absolute;
    top: 0;
  `;
  const TopBarLogo = styled.div`
    margin-left: 1rem;
    color: inherit;
  `;
  return (
    <TopBarWrapper>
      <TopBarLogo>JZ PUSHING</TopBarLogo>
    </TopBarWrapper>
  );
}

export default TopBar;
