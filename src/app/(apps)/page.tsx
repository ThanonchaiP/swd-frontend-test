"use client";

import { Flex, Typography } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import styles from "./page.module.scss";

export default function Home() {
  const { t } = useTranslation();

  const list = [
    {
      id: 1,
      title: t("test", { number: 1 }),
      description: t("layoutAndStyle"),
      link: "/layout-and-style",
    },
    {
      id: 2,
      title: t("test", { number: 2 }),
      description: t("formAndTable"),
      link: "/form-and-table",
    },
  ];

  return (
    <Flex gap={14} wrap="wrap" className={styles["card-wrapper"]}>
      {list.map((item) => (
        <Link href={item.link} key={item.id} className={styles["card"]}>
          <Typography.Text strong>{item.title}</Typography.Text>
          <Typography.Paragraph className={styles["card-description"]}>
            {item.description}
          </Typography.Paragraph>
        </Link>
      ))}
    </Flex>
  );
}
