import { IUserAccount, IUserAccountForm } from "@/common/types/userAccountType";
import { replace } from "formik";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { replaceAccountList } from "@/store/accountDataSlice";
import { replaceMessageTemplateList } from "@/store/messageTemplateDataSlice";
import { useSession } from "next-auth/react";
import {
  IResponseMessage,
  ISendResponse,
} from "@/common/types/backendBasicTypes";
import { ResponseStatus } from "@/common/types/ResponseStatus";
import { IRequestChannelTemplateParam } from "@/common/types/backendApiTypes";

import { refreshData } from "@/store/dataRefreshSlice";
import { accountSaveParamsType } from "@/pages/api/channels/save";
import { IMessageTemplate } from "@/common/types/messageTemplateTypes";

export const useUserDataReducers = () => {
  const dispatch = useAppDispatch();
  const { accountList, messageTemplateList, dataRefreshSign } = useAppSelector(
    (state) => ({
      accountList: state.accountList.accountData,
      messageTemplateList: state.messageTemplateList.messageTemplateLists,
      dataRefreshSign: state.dataRefresh,
    })
  );
  const doRefreshData = () => {
    dispatch(refreshData());
  };
  const doReplaceAccountList = (newAccountList: IUserAccount[]) => {
    dispatch(replaceAccountList(newAccountList));
  };
  const doReplaceMessageTemplateList = (
    newMessageTemplateList: IMessageTemplate[]
  ) => {
    dispatch(replaceMessageTemplateList(newMessageTemplateList));
  };
  const refetchAccountList = async (creator: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/list?creator=${creator}`
      );
      const responseData: IResponseMessage<IUserAccount[]> =
        await response.json();
      if (responseData.status == ResponseStatus.SUCCESS) {
        dispatch(replaceAccountList(responseData.data));
      } else {
        throw new Error(responseData.msg);
      }
    } catch (error) {
      throw error;
    }
  };
  interface IMessageTemplateList {
    rows: IMessageTemplate[];
    count: number;
  }
  const refetchMessageTemplateList = async (creator: string) => {
    const params: IRequestChannelTemplateParam = {
      page: 1,
      perPage: 10,
      creator,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/messageTemplate/list?page=${params.page}&perPage=${params.perPage}&creator=${params.creator}`
      );
      const responseData: IResponseMessage<IMessageTemplateList> =
        await response.json();
      if (responseData.status == ResponseStatus.SUCCESS) {
        const messageTemplateList: IMessageTemplate[] = responseData.data.rows;
        dispatch(replaceMessageTemplateList(messageTemplateList));
      } else {
        throw new Error(responseData.msg);
      }
    } catch (error) {
      throw error;
    }
  };
  const saveOrUpdateMessageTemplate = async (
    messageTemplate: IMessageTemplate
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/messageTemplate/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageTemplate),
        }
      );
      const responseData: IResponseMessage<IMessageTemplate> =
        await response.json();
      if (responseData.status == ResponseStatus.SUCCESS) {
      } else {
        throw new Error(responseData.msg);
      }
    } catch (error) {
      throw error;
    }
  };
  const saveOrUpdateUserAccount = async (
    userAccount: accountSaveParamsType
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/save`,
        {
          method: "POST",
          body: JSON.stringify(userAccount),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData: IResponseMessage<IUserAccount[]> =
        await response.json();
      if (responseData.status == ResponseStatus.SUCCESS) {
      } else {
        throw new Error(responseData.msg);
      }
    } catch (error) {
      throw error;
    }
  };
  const getAccountById = (id: number) => {
    return accountList.find((account) => account.id == id);
  };
  return {
    accountList,
    messageTemplateList,
    dataRefreshSign,
    doReplaceAccountList,
    doReplaceMessageTemplateList,
    refetchAccountList,
    refetchMessageTemplateList,
    getAccountById,
    saveOrUpdateMessageTemplate,
    saveOrUpdateUserAccount,
    doRefreshData,
  };
};
