"use client";

import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { UserForm } from "@/components/user-form";
import { UserList } from "@/components/user-list";

export default function FormAndTable() {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={1}>{t("Form & Table")}</Typography.Title>
      <UserForm />
      <UserList />
    </Flex>
  );
}
