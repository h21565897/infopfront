"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { useUserDataReducers } from "../hooks/useUserAccountAndTemplateData/hooks";

function DataInitializer({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { refetchAccountList, refetchMessageTemplateList, dataRefreshSign } =
    useUserDataReducers();
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState("");
  useMemo(async () => {
    if (session?.user_creator) {
      console.log("runrunrurnrunle");
      try {
        await refetchAccountList(session.user_creator);
        await refetchMessageTemplateList(session.user_creator);
      } catch (error: any) {
        console.log(error);
        setErrorMsg(error.message);
      }
    }
  }, [dataRefreshSign, session?.user_creator]);
  return <div>{errorMsg ? errorMsg : children}</div>;
}

export default DataInitializer;
