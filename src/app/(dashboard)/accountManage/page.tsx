"use client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { headers, cookies } from "next/headers";
import { channel } from "diagnostics_channel";
import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { getSendChannelNameById } from "@/common/types/messageTemplateFormTypes";
import { IResponseMessage } from "@/common/types/backendBasicTypes";
import { ResponseStatus } from "@/common/types/ResponseStatus";
import { Toaster, toast } from "react-hot-toast";

function ChannelManagement() {
  const OverFlowCell = styled(TableCell)`
    overflow: auto;
    flex-grow: 1;
    flex-basis: 0;
  `;
  const TableRowWrapper = styled(TableRow)`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 70vw;
  `;
  const { data: session } = useSession();
  const { accountList, doRefreshData } = useUserDataReducers();
  return (
    <div>
      <Toaster></Toaster>
      <TableContainer component={Paper}></TableContainer>
      <Table>
        <TableHead>
          <TableRowWrapper>
            <TableCell>ID</TableCell>
            <TableCell align="left">Account Name</TableCell>
            <OverFlowCell align="left">Account Configs</OverFlowCell>
            <TableCell align="left">Send Channel</TableCell>
            <TableCell align="left">Manipulation</TableCell>
          </TableRowWrapper>
        </TableHead>
        <TableBody>
          {accountList.map((account) => {
            return (
              <TableRowWrapper key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <OverFlowCell>{account.accountConfig}</OverFlowCell>
                <TableCell>
                  {getSendChannelNameById(account.sendChannel.toString())}
                </TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/delete/${account.id}`,
                        {
                          method: "DELETE",
                        }
                      );
                      const responseData: IResponseMessage<null> =
                        await response.json();
                      if (responseData.status != ResponseStatus.SUCCESS) {
                        throw new Error(responseData.msg);
                      }
                      doRefreshData();
                      toast.success("Delete successfully");
                    } catch (error: any) {
                      toast.error(error.message);
                    }
                  }}
                >
                  Delete
                </Button>
              </TableRowWrapper>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ChannelManagement;
