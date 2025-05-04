"use client";

import { Flex, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { UserForm } from "@/components/user-form";
import { UserList } from "@/components/user-list";
import { useAppDispatch } from "@/store/configureStore";
import { reset } from "@/store/slices/userSlice";

export default function FormAndTable() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={1}>{t("formAndTable")}</Typography.Title>
      <UserForm />
      <UserList />
    </Flex>
  );
}
