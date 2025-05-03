"use client";

import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { UserForm } from "@/components/user-form";

export default function FormAndTable() {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={1}>{t("layoutAndStyle")}</Typography.Title>
      <UserForm />
    </Flex>
  );
}
