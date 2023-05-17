"use client";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { IRequestChannelTemplateParam } from "../../../common/types/backendApiTypes";

import {
  IDefaultResponseData,
  IResponseMessage,
  ISendResponse,
} from "@/common/types/backendBasicTypes";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { ResponseStatus } from "@/common/types/ResponseStatus";
import { useRouter } from "next/navigation";
import { useUserDataReducers } from "@/hooks/useUserAccountAndTemplateData/hooks";
import {
  sendChannelTypeObj,
  messageTypeObj,
  receiverIdTypeObj,
} from "@/common/types/messageTemplateFormTypes";

function TempaltePage() {
  const [testdwindowOpen, setTestdwindowOpen] = useState(false);
  const testEmailRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const handleTestWindowOpen = () => {
    setTestdwindowOpen(true);
  };
  const router = useRouter();

  const {
    messageTemplateList: messageTemplatesList,
    refetchMessageTemplateList,
    doRefreshData,
  } = useUserDataReducers();
  return (
    <div>
      <Toaster></Toaster>
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Tempalte Name</TableCell>
              <TableCell align="right">Send Channel</TableCell>
              <TableCell align="right">Template Type</TableCell>
              <TableCell align="right">Creator</TableCell>
              <TableCell align="right">Receiver Id Type</TableCell>
              <TableCell align="right">Manipulation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messageTemplatesList.map((messageTemplate, index) => {
              return (
                <TableRow key={messageTemplate.id}>
                  <TableCell>{messageTemplate.id}</TableCell>
                  <TableCell align="right">{messageTemplate.name}</TableCell>
                  <TableCell align="right">
                    {(() => {
                      for (const prop in sendChannelTypeObj) {
                        const value =
                          sendChannelTypeObj[
                            prop as keyof typeof sendChannelTypeObj
                          ];
                        if (value == messageTemplate.sendChannel) {
                          return prop;
                        }
                      }
                      return "xxx";
                    })()}
                  </TableCell>
                  <TableCell align="right">
                    {(() => {
                      for (const prop in messageTypeObj) {
                        const value =
                          messageTypeObj[prop as keyof typeof messageTypeObj];
                        if (value == messageTemplate.msgType) {
                          return prop;
                        }
                      }
                      return "xxx";
                    })()}
                  </TableCell>
                  <TableCell align="right">{messageTemplate.creator}</TableCell>
                  <TableCell align="right">
                    {(() => {
                      for (const prop in receiverIdTypeObj) {
                        const value =
                          receiverIdTypeObj[
                            prop as keyof typeof receiverIdTypeObj
                          ];
                        if (value == messageTemplate.idType) {
                          return prop.toLowerCase();
                        }
                      }
                      return "xxx";
                    })()}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={handleTestWindowOpen}>TEST</Button>
                      <Button
                        onClick={() => {
                          router.push(`/templateManage/details/${index}`);
                        }}
                      >
                        DETAILS
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`/templateManage/edit/${index}`);
                        }}
                      >
                        EDIT
                      </Button>
                      <Button
                        onClick={async () => {
                          const response = await fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/messageTemplate/copy/${messageTemplate.id}`,
                            { method: "POST" }
                          );
                          const responseData: IResponseMessage<null> =
                            await response.json();
                          if (responseData.status === ResponseStatus.SUCCESS) {
                            toast.success("copy success");
                            doRefreshData();
                          } else {
                            toast.error(responseData.msg);
                          }
                        }}
                      >
                        COPY
                      </Button>
                      <Button
                        onClick={async () => {
                          const response = await fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/messageTemplate/recall/${messageTemplate.id}`,
                            { method: "POST" }
                          );
                          const responseData: IResponseMessage<ISendResponse> =
                            await response.json();
                          if (responseData.status === ResponseStatus.SUCCESS) {
                            toast.success(responseData.msg);
                            doRefreshData();
                          } else {
                            toast.error(responseData.msg);
                          }
                        }}
                      >
                        RECALL
                      </Button>
                      <Button
                        onClick={async () => {
                          const response = await fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/messageTemplate/delete/${messageTemplate.id}`,
                            { method: "DELETE" }
                          );
                          const responseData: IResponseMessage<null> =
                            await response.json();
                          if (responseData.status === ResponseStatus.SUCCESS) {
                            toast.success("delete success");
                            doRefreshData();
                          } else {
                            toast.error(responseData.msg);
                          }
                        }}
                      >
                        DELETE
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <Dialog open={testdwindowOpen}>
                    <DialogTitle>Send Confirmation</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To test the send protocol, you should input the receiver
                        address
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="receiver"
                        fullWidth
                        variant="standard"
                        inputRef={testEmailRef}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setTestdwindowOpen(false)}>
                        cancel
                      </Button>
                      <Button
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          event.preventDefault();
                          const func1 = async () => {
                            const sendResponse = await fetch(
                              `${process.env.NEXT_PUBLIC_BACKEND_URL}/messageTemplate/test`,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  id: messageTemplate.id,
                                  receiver: testEmailRef.current?.value,
                                  testParam: "",
                                }),
                              }
                            );
                            const sendResponseData: IResponseMessage<IDefaultResponseData> =
                              await sendResponse.json();
                            if (
                              sendResponseData.status === ResponseStatus.SUCCESS
                            ) {
                              toast.success("send success");
                              setTestdwindowOpen(false);
                            } else {
                              toast.error(sendResponseData.msg);
                            }
                          };
                          func1();
                        }}
                      >
                        send
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TempaltePage;
